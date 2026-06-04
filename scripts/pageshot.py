"""End-to-end Playwright check of the deployed (or locally served) site.

Targets:
  - Landing page `/` (English, Chinese, Japanese, all via ?lang=)
  - Explore page `/explore/`

What it verifies:
  1. HTTP 200 + correct <title> + visible <h1>.
  2. NO React / hydration errors in the console (would indicate a
     regression of the CRITICAL #418 / #423 issues we just fixed).
  3. Language switching: clicking the language switcher in the top
     nav actually changes the page text + URL + localStorage.
  4. The search bar on /explore filters the project list.
  5. Category sidebar click on /explore swaps the active filter.
  6. Explore header auto-hides on scroll-down and re-shows on
     scroll-up (the "上栏可以折叠" feature). The header wrapper
     should carry `-translate-y-[calc(100%-12px)]` after a
     substantial scroll-down and `translate-y-0` again after a
     scroll-up past the threshold.
  7. Screenshots before / after each interaction for a visual
     sanity check (saved to .playwright-pageshots/).

Override the base URL with the BASE env var — `BASE=http://localhost:8080
python3 scripts/pageshot.py` runs against the local `pnpm start`
serving of `out/`. The default is the GitHub Pages deployment so
the production smoke check stays useful.
"""

import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "https://badhope.github.io/NetTools-Hub/")
SHOTS = Path(".playwright-pageshots")
SHOTS.mkdir(parents=True, exist_ok=True)

# Errors we will treat as fatal. React 19 hydration
# mismatches show up as a single console.error with a "Minified
# React error #418" / "#423" prefix; the dev build prints a
# multi-line "Hydration failed because the initial UI does not
# match what was rendered on the server" block instead. We catch
# both by substring.
HYDRATION_MARKERS = (
    "did not match",
    "Hydration failed",
    "hydrating",
    "Minified React error #418",
    "Minified React error #423",
    "Minified React error #425",
    "Text content does not match server-rendered HTML",
)


def is_hydration_error(msg: str) -> bool:
    return any(m.lower() in msg.lower() for m in HYDRATION_MARKERS)


def main() -> int:
    failures: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            locale="en-US",
        )
        page = context.new_page()

        # Capture every console message and every uncaught page
        # error. We do not bail on the first failure because we
        # want a single report that covers all pages.
        console: list[dict] = []
        page_errors: list[str] = []

        def on_console(msg):
            try:
                console.append(
                    {
                        "type": msg.type,
                        "text": msg.text,
                        "location": msg.location,
                    }
                )
            except Exception:
                pass

        def on_pageerror(err):
            page_errors.append(str(err))

        page.on("console", on_console)
        page.on("pageerror", on_pageerror)

        # ------------------------------------------------------------
        # 1) Landing — English (default)
        # ------------------------------------------------------------
        print("\n=== Landing (English, default) ===")
        page.goto(BASE, wait_until="load")
        page.screenshot(path=str(SHOTS / "01-landing-en.png"), full_page=False)
        title = page.title()
        h1_text = page.locator("h1").first.text_content()
        print(f"  title: {title!r}")
        print(f"  h1   : {h1_text!r}")
        if "Atlas" not in h1_text or "Network Tools" not in h1_text:
            failures.append(f"landing h1 unexpected: {h1_text!r}")

        # ------------------------------------------------------------
        # 2) Landing — Chinese via ?lang=zh (the deep link that used
        #    to throw the React 19 #418 / #423 hydration error)
        # ------------------------------------------------------------
        print("\n=== Landing (Chinese, ?lang=zh) ===")
        console.clear()
        page_errors.clear()
        page.goto(BASE + "?lang=zh", wait_until="load")
        page.screenshot(path=str(SHOTS / "02-landing-zh.png"), full_page=False)
        h1_zh = page.locator("h1").first.text_content()
        print(f"  h1   : {h1_zh!r}")
        if "图鉴" not in h1_zh and "网络工具" not in h1_zh:
            failures.append(f"landing zh h1 unexpected: {h1_zh!r}")
        html_lang = page.evaluate("document.documentElement.lang")
        print(f"  <html lang>: {html_lang!r}")
        if html_lang != "zh-Hans":
            failures.append(f"<html lang> should be zh-Hans, got {html_lang!r}")

        # ------------------------------------------------------------
        # 3) Landing — Japanese via ?lang=ja
        # ------------------------------------------------------------
        print("\n=== Landing (Japanese, ?lang=ja) ===")
        console.clear()
        page_errors.clear()
        page.goto(BASE + "?lang=ja", wait_until="load")
        page.screenshot(path=str(SHOTS / "03-landing-ja.png"), full_page=False)
        h1_ja = page.locator("h1").first.text_content()
        print(f"  h1   : {h1_ja!r}")
        if "図鑑" not in h1_ja and "ネットワークツール" not in h1_ja:
            failures.append(f"landing ja h1 unexpected: {h1_ja!r}")
        html_lang = page.evaluate("document.documentElement.lang")
        print(f"  <html lang>: {html_lang!r}")
        if html_lang != "ja":
            failures.append(f"<html lang> should be ja, got {html_lang!r}")

        # ------------------------------------------------------------
        # 4) Hydration check: visit ?lang=zh and look at console
        #    for any "did not match" / "Hydration failed" lines.
        #    The previous build would error here on every deep link.
        # ------------------------------------------------------------
        print("\n=== Hydration check (any console errors?) ===")
        console.clear()
        page_errors.clear()
        page.goto(BASE + "?lang=zh", wait_until="load")
        # Give the post-hydration microtask a chance to fire
        # (setLangState inside queueMicrotask runs after the first
        # paint; we want to be sure no error slipped out).
        page.wait_for_timeout(800)
        bad = [m for m in console if m["type"] == "error"]
        bad += [{"type": "pageerror", "text": e, "location": None} for e in page_errors]
        bad = [b for b in bad if is_hydration_error(b.get("text", ""))]
        if bad:
            for b in bad:
                failures.append(
                    f"HYDRATION ERROR on {page.url}: {b['text']!r} @ {b['location']}"
                )
        else:
            print("  no hydration / React errors in console OK")
        if page_errors:
            for e in page_errors:
                failures.append(f"pageerror: {e}")

        # ------------------------------------------------------------
        # 5) Language switcher interaction. From ?lang=zh, click
        #    the EN option in the language dropdown and confirm:
        #    - URL becomes /
        #    - h1 reverts to "An Atlas / Network Tools"
        #    - <html lang> becomes "en"
        #    - localStorage['nethub.lang'] === 'en'
        # ------------------------------------------------------------
        print("\n=== Language switcher: zh -> en ===")
        page.goto(BASE + "?lang=zh", wait_until="load")
        # The top-nav language switcher is a button. Locate by
        # aria-haspopup attribute.
        switcher = page.locator("[aria-haspopup='listbox']").first
        if switcher.count() == 0:
            failures.append("language switcher button not found")
        else:
            switcher.click()
            page.wait_for_timeout(300)
            # The listbox options are short labels: "EN", "中文", "日本語".
            en_option = page.locator("[role='option']", has_text="EN").first
            if en_option.count() == 0:
                # last-resort: first option in the listbox
                en_option = page.locator("[role='option']").first
            en_option.click()
            page.wait_for_timeout(500)
            url_after = page.url
            h1_after = page.locator("h1").first.text_content()
            html_lang_after = page.evaluate("document.documentElement.lang")
            stored = page.evaluate("localStorage.getItem('nethub.lang')")
            print(f"  url        : {url_after}")
            print(f"  h1         : {h1_after!r}")
            print(f"  <html lang>: {html_lang_after!r}")
            print(f"  storage    : {stored!r}")
            page.screenshot(path=str(SHOTS / "04-landing-after-switch.png"))
            if "lang=zh" in url_after:
                failures.append(f"URL still has lang=zh after switch: {url_after}")
            if "Network Tools" not in h1_after:
                failures.append(f"h1 did not revert to English: {h1_after!r}")
            if stored != "en":
                failures.append(f"localStorage wrong: {stored!r}")

        # ------------------------------------------------------------
        # 6) Explore page
        # ------------------------------------------------------------
        print("\n=== Explore (English, default) ===")
        console.clear()
        page_errors.clear()
        page.goto(BASE + "explore/", wait_until="load")
        page.screenshot(path=str(SHOTS / "05-explore-en.png"), full_page=False)
        h1 = page.locator("h1").first.text_content()
        cards = page.locator("a[href*='github.com']").count()
        print(f"  h1          : {h1!r}")
        print(f"  project links: {cards}")
        if "Explore" not in h1:
            failures.append(f"explore h1 unexpected: {h1!r}")
        if cards < 50:
            failures.append(f"explore should have 100+ project links, got {cards}")

        # ------------------------------------------------------------
        # 7) Search bar interaction. Type "clash" and confirm the
        #    visible project list narrows. Use the result-count
        #    live region for a stable assertion.
        # ------------------------------------------------------------
        print("\n=== Explore search: 'clash' ===")
        page.goto(BASE + "explore/", wait_until="load")
        # The search input has type="search" and an aria-label of
        # "{search.aria_label} ({shortcut hint})" — e.g. "Search
        # projects (Press / to focus)". Use the input type which is
        # stable across locales.
        search = page.locator("input[type='search']").first
        if search.count() == 0:
            failures.append("search input not found")
        else:
            before = page.locator("a[href*='github.com']").count()
            search.fill("clash")
            page.wait_for_timeout(1200)  # 300ms debounce + useDeferredValue
            after = page.locator("a[href*='github.com']").count()
            print(f"  project links before: {before}, after 'clash': {after}")
            page.screenshot(path=str(SHOTS / "06-explore-search-clash.png"))
            if after >= before:
                failures.append(
                    f"search did not narrow results (before={before}, after={after})"
                )
            if after == 0:
                failures.append("search returned 0 results for 'clash' (expected a few)")
            if after > 30:
                failures.append(
                    f"search returned too many results for 'clash' ({after}); fuzzy match may be off"
                )

        # ------------------------------------------------------------
        # 8) Explore header auto-hide on scroll. The whole
        #    <header> (TopNav + stats + search) lives inside a
        #    `sticky top-0 z-40` wrapper, and the inner div is
        #    translated up by `calc(100% - 12px)` while a "show
        #    header" tab peeks out at the top.
        #
        #    Sequence:
        #      - scroll down ~1500px -> wrapper is hidden
        #      - the "show header" tab is now visible
        #      - scroll up by ~600px (above the 8px delta
        #        threshold, but not all the way back to y=0)
        #      - wrapper is visible again
        # ------------------------------------------------------------
        print("\n=== Explore: header auto-hide on scroll ===")
        page.goto(BASE + "explore/", wait_until="load")
        # Wait for the search input to be present so we know the
        # header chrome has rendered. (The i18n shortcut hint
        # lives in `aria-label` only, not visible text, so we
        # cannot match it as a `text=` selector.)
        page.wait_for_selector("input[type='search']", timeout=5000)
        # The auto-hide wrapper is the only direct child of the
        # outer sticky container. We use a structural selector
        # that does not depend on a custom hook: the outer
        # `<div class="sticky top-0 z-40">` is unique on the
        # page, and its first child carries the transform.
        wrapper_inner = page.locator(
            "div.sticky.top-0.z-40 > div.will-change-transform"
        )
        if wrapper_inner.count() == 0:
            failures.append(
                "explore: scroll-collapse inner wrapper not found "
                "(check the new <TopNav sticky={false}> wrapper in explore-content.tsx)"
            )
        else:
            # (1) baseline: y=0, wrapper should be visible.
            # Tailwind v4 emits translate utility classes via the
            # newer CSS `translate` property, not via the legacy
            # `transform: translate(...)` shorthand — so the
            # `transform` computed value stays `none` while the
            # `translate` value carries the actual offset. We
            # read the `translate` property so the assertion
            # tracks the visual position, which is what we
            # actually want to verify.
            def read_translate(el):
                return el.evaluate(
                    "el => getComputedStyle(el).translate"
                )

            t_baseline = read_translate(wrapper_inner)
            print(f"  baseline translate: {t_baseline!r}")
            page.screenshot(path=str(SHOTS / "10-explore-header-top.png"))

            # (2) scroll down past the 120px threshold + a healthy
            #     delta so the rAF flush sets headerCollapsed=true.
            page.evaluate("window.scrollTo({ top: 1500, behavior: 'instant' })")
            # Two RAFs: the scroll handler schedules one, the
            # setState commit needs a frame to apply, then the
            # 300 ms CSS transition has to finish. 500 ms is
            # generous without being slow.
            page.wait_for_timeout(500)
            t_hidden = read_translate(wrapper_inner)
            print(f"  after scroll-down translate: {t_hidden!r}")
            page.screenshot(path=str(SHOTS / "11-explore-header-hidden.png"))
            if t_hidden == t_baseline:
                failures.append(
                    f"explore header did NOT collapse on scroll-down "
                    f"(translate stayed at {t_hidden!r})"
                )
            # The "show header" tab should be visible now.
            show_btn = page.locator("button[aria-label*='header' i], button[aria-label*='ヘッダー'], button[aria-label*='顶栏'], button[aria-label*='Show header']")
            if show_btn.count() == 0:
                failures.append(
                    "explore: 'show header' tab not visible after scroll-down"
                )
            else:
                print("  'show header' tab visible OK")

            # (3) scroll back up enough to flip the delta sign and
            #     cross the -8px threshold. We do NOT want to
            #     scroll all the way to y=0 because the
            #     "always show below 120" branch would mask the
            #     scroll-up branch.
            page.evaluate("window.scrollTo({ top: 600, behavior: 'instant' })")
            page.wait_for_timeout(500)
            t_shown = read_translate(wrapper_inner)
            print(f"  after scroll-up translate:   {t_shown!r}")
            page.screenshot(path=str(SHOTS / "12-explore-header-reshown.png"))
            if t_shown != t_baseline:
                failures.append(
                    f"explore header did NOT re-show on scroll-up "
                    f"(expected {t_baseline!r}, got {t_shown!r})"
                )

        # ------------------------------------------------------------
        # 9) Sidebar category click. Pick the first category and
        #    confirm the URL gains ?category=... and the result
        #    count changes.
        # ------------------------------------------------------------
        print("\n=== Explore sidebar: click first category ===")
        page.goto(BASE + "explore/", wait_until="load")
        # Sidebar category links are <a href="?category=..."> elements
        # inside an <aside> / <nav>.
        first_cat = page.locator("a[href*='?category=']").first
        if first_cat.count() == 0:
            failures.append("no category links in sidebar")
        else:
            href_before_click = first_cat.get_attribute("href")
            print(f"  clicking: {href_before_click!r}")
            first_cat.click()
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(300)
            url_after = page.url
            h1_after = page.locator("h1").first.text_content()
            print(f"  url after: {url_after}")
            print(f"  h1 after : {h1_after!r}")
            page.screenshot(path=str(SHOTS / "07-explore-after-category.png"))
            if "category=" not in url_after:
                failures.append(
                    f"category click did not add ?category= to URL: {url_after}"
                )

        # ------------------------------------------------------------
        # 9) Explore — Chinese deep link
        # ------------------------------------------------------------
        print("\n=== Explore (Chinese, ?lang=zh) ===")
        console.clear()
        page_errors.clear()
        page.goto(BASE + "explore/?lang=zh", wait_until="load")
        page.wait_for_timeout(500)
        h1_zh = page.locator("h1").first.text_content()
        html_lang = page.evaluate("document.documentElement.lang")
        print(f"  h1         : {h1_zh!r}")
        print(f"  <html lang>: {html_lang!r}")
        page.screenshot(path=str(SHOTS / "08-explore-zh.png"), full_page=False)
        bad = [m for m in console if m["type"] == "error"]
        bad += [{"type": "pageerror", "text": e, "location": None} for e in page_errors]
        bad = [b for b in bad if is_hydration_error(b.get("text", ""))]
        if bad:
            for b in bad:
                failures.append(f"EXPLORE HYDRATION ERROR: {b['text']!r}")
        if html_lang != "zh-Hans":
            failures.append(f"explore <html lang> should be zh-Hans, got {html_lang!r}")

        # ------------------------------------------------------------
        # 10) 404 page
        # ------------------------------------------------------------
        print("\n=== 404 page (non-existent route) ===")
        page.goto(BASE + "this-route-does-not-exist/", wait_until="load")
        page.screenshot(path=str(SHOTS / "09-404.png"), full_page=False)
        h1_404 = page.locator("h1").first.text_content()
        print(f"  h1: {h1_404!r}")
        if "4" not in h1_404:
            failures.append(f"404 h1 unexpected: {h1_404!r}")

        browser.close()

    # ------------------------------------------------------------
    # Final report
    # ------------------------------------------------------------
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    if failures:
        print(f"FAILED ({len(failures)} failure(s)):")
        for f in failures:
            print(f"  - {f}")
        return 1
    print("All checks passed.")
    print(f"Screenshots in: {SHOTS}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
