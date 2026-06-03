"""End-to-end smoke test of the deployed NetTools-Hub site."""
from playwright.sync_api import sync_playwright


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page = ctx.new_page()

        # Capture console errors and page errors
        console_errors = []
        page_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        # 1. Landing page
        print("=== 1. Landing page (English) ===")
        page.goto("https://badhope.github.io/NetTools-Hub/", wait_until="networkidle")
        title = page.title()
        print(f"  title: {title}")
        h1 = page.locator("h1, h2").first.text_content() or ""
        print(f"  first heading: {h1[:80]}")
        # Verify "Last indexed" date is from data
        date = page.locator("text=2026-06-01").first.text_content()
        print(f"  last indexed: {date}")
        # Check no broken images
        broken = page.evaluate("() => Array.from(document.querySelectorAll('img')).filter(i => !i.complete || i.naturalWidth === 0).length")
        print(f"  broken images: {broken}")
        page.screenshot(path="/workspace/net-tools-hub/smoke-1-landing.png", full_page=False)

        # 2. Landing page Chinese
        print("\n=== 2. Landing page (Chinese) ===")
        page.goto("https://badhope.github.io/NetTools-Hub/?lang=zh", wait_until="networkidle")
        page.wait_for_timeout(500)
        body_text = page.locator("body").text_content() or ""
        has_zh = any('\u4e00' <= c <= '\u9fff' for c in body_text)
        print(f"  contains CJK: {has_zh}")
        page.screenshot(path="/workspace/net-tools-hub/smoke-2-landing-zh.png", full_page=False)

        # 3. Explore page - navigate from landing
        print("\n=== 3. Explore page (from landing) ===")
        page.goto("https://badhope.github.io/NetTools-Hub/", wait_until="networkidle")
        cards = page.locator("a[href*='/explore/?category=protocol_tools']").count()
        print(f"  protocol_tools category links on landing: {cards}")
        page.locator("a[href*='/explore/?category=protocol_tools']").first.click()
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)
        url = page.url
        print(f"  clicked protocol_tools, url: {url}")
        # Count project cards (github links)
        gh_links = page.locator("a[href*='github.com']").count()
        print(f"  github.com links on filtered page: {gh_links}")
        page.screenshot(path="/workspace/net-tools-hub/smoke-3-explore-vpn.png", full_page=False)

        # 4. Search
        print("\n=== 4. Search ===")
        page.goto("https://badhope.github.io/NetTools-Hub/explore/", wait_until="networkidle")
        search = page.locator("input[type='search']").first
        search.fill("clash")
        page.wait_for_timeout(800)
        project_links = page.locator("a[target='_blank'][href*='github.com']").count()
        print(f"  project links after searching 'clash': {project_links}")

        # 5. 404 page
        print("\n=== 5. 404 page ===")
        page.goto("https://badhope.github.io/NetTools-Hub/404.html", wait_until="networkidle")
        has_404 = "404" in (page.locator("body").text_content() or "")
        print(f"  contains '404': {has_404}")
        page.screenshot(path="/workspace/net-tools-hub/smoke-4-404.png", full_page=False)

        # 6. Mobile viewport test
        print("\n=== 6. Mobile viewport ===")
        page.set_viewport_size({"width": 375, "height": 812})
        page.goto("https://badhope.github.io/NetTools-Hub/", wait_until="networkidle")
        menu_btn = page.locator("button[aria-label*='Menu']")
        print(f"  mobile menu button count: {menu_btn.count()}")
        if menu_btn.count() > 0:
            menu_btn.first.click()
            page.wait_for_timeout(500)
            drawer = page.locator("[role='dialog']")
            print(f"  drawer opened: {drawer.count() > 0}")
            page.screenshot(path="/workspace/net-tools-hub/smoke-5-mobile-drawer.png", full_page=False)
            focused = page.evaluate("() => document.activeElement?.getAttribute('data-drawer-close')")
            print(f"  close button has focus on open: {focused is not None}")
            page.keyboard.press("Escape")
            page.wait_for_timeout(500)
            drawer_open = page.locator("[role='dialog']").count()
            print(f"  drawer closed by Escape: {drawer_open == 0}")
            focused = page.evaluate("() => document.activeElement?.tagName")
            print(f"  focus returned to: {focused}")

        # Report console errors
        print(f"\n=== Console errors: {len(console_errors)} ===")
        for err in console_errors[:5]:
            print(f"  - {err[:200]}")
        print(f"=== Page errors: {len(page_errors)} ===")
        for err in page_errors[:5]:
            print(f"  - {err[:200]}")

        browser.close()
        print("\nDONE")


if __name__ == "__main__":
    main()
