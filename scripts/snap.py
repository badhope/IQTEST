"""
Take screenshots of the three static-exported pages.
Static export is served via python3 -m http.server on port 8081
out of the `out/` directory, with a `NetTools-Hub -> .` symlink
so the basePath-prefixed asset URLs resolve.
"""
import os
from playwright.sync_api import sync_playwright

OUT = "/workspace/net-tools-hub/screenshots"
os.makedirs(OUT, exist_ok=True)
BASE = "http://localhost:8081/NetTools-Hub"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # 1) Desktop landing
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    page.goto(f"{BASE}/", wait_until="networkidle")
    page.wait_for_timeout(900)
    page.screenshot(path=f"{OUT}/landing-fullpage.png", full_page=True)
    page.screenshot(path=f"{OUT}/landing.png")
    print("landing-fullpage.png done")
    ctx.close()

    # 2) Desktop explore
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    page.goto(f"{BASE}/explore/", wait_until="networkidle")
    page.wait_for_timeout(900)
    page.screenshot(path=f"{OUT}/explore-fullpage.png", full_page=True)
    page.screenshot(path=f"{OUT}/explore.png")
    print("explore-fullpage.png done")
    ctx.close()

    # 3) Desktop explore with category selected
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    page.goto(
        f"{BASE}/explore/?category=core",
        wait_until="networkidle",
    )
    page.wait_for_timeout(900)
    page.screenshot(path=f"{OUT}/explore-category.png", full_page=True)
    print("explore-category.png done")
    ctx.close()

    # 4) Desktop 404
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    page.goto(f"{BASE}/this-does-not-exist", wait_until="networkidle")
    page.wait_for_timeout(500)
    page.screenshot(path=f"{OUT}/404.png", full_page=True)
    print("404.png done")
    ctx.close()

    # 5) Mobile landing
    ctx = browser.new_context(viewport={"width": 390, "height": 844})
    page = ctx.new_page()
    page.goto(f"{BASE}/", wait_until="networkidle")
    page.wait_for_timeout(900)
    page.screenshot(path=f"{OUT}/landing-mobile.png", full_page=True)
    print("landing-mobile.png done")
    ctx.close()

    # 6) Mobile explore
    ctx = browser.new_context(viewport={"width": 390, "height": 844})
    page = ctx.new_page()
    page.goto(f"{BASE}/explore/", wait_until="networkidle")
    page.wait_for_timeout(900)
    page.screenshot(path=f"{OUT}/explore-mobile.png", full_page=True)
    print("explore-mobile.png done")
    ctx.close()

    # 7) Multilingual — Chinese
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    page.goto(f"{BASE}/?lang=zh", wait_until="networkidle")
    page.wait_for_timeout(1500)  # extra time for setLang + replaceState
    page.screenshot(path=f"{OUT}/landing-zh.png", full_page=True)
    print("landing-zh.png done")
    ctx.close()

    # 8) Multilingual — Japanese
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    page.goto(f"{BASE}/?lang=ja", wait_until="networkidle")
    page.wait_for_timeout(1500)
    page.screenshot(path=f"{OUT}/landing-ja.png", full_page=True)
    print("landing-ja.png done")
    ctx.close()

    browser.close()
print("all done")
