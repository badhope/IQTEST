"use client";

import { useEffect } from "react";
import { LANG_HTML_LANG, Lang } from "@/lib/i18n";
import { useClientLang } from "@/lib/use-client-lang";

/**
 * Keeps `<html lang>` in sync with the client-side language state.
 *
 * The static export prerenders the document with `<html lang="en">`
 * (see `app/layout.tsx`), so we have to push the real language to the
 * DOM in a post-mount effect. We listen on the same
 * `nethub:langchange` event used by `setLangAndPersist` so any
 * language switch — from any component — updates the attribute
 * without prop-drilling a callback through the layout tree.
 *
 * `tabIndex={-1}` is *not* on this element; the actual skip-link
 * target is the `<main id="main">` deeper in the tree, and giving
 * `<html>` a tab stop would make Tab from the URL bar focus the
 * invisible language attribute before anything useful.
 */
export function SetHtmlLang() {
  const [lang] = useClientLang();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = LANG_HTML_LANG[lang as Lang];
  }, [lang]);

  return null;
}
