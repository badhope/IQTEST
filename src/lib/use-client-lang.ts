"use client";

import { useCallback, useEffect, useState } from "react";
import { Lang, resolveInitialLang, setLangAndPersist } from "@/lib/i18n";

/**
 * Client-only `Lang` state hook.
 *
 * The static-export build prerenders every page with `<html lang="en">`
 * (see `app/layout.tsx`); we don't know the user's preferred language
 * at build time, so every page that renders any localised text has
 * to (a) start with the *real* language from the URL / `localStorage`
 * / `navigator` chain on first paint, then (b) upgrade later if the
 * user changes the language via the switcher.
 *
 * The initial value comes from `useState`'s lazy initializer, which
 * runs exactly once per component lifecycle. On the server, it
 * always returns `"en"` (because `window` is undefined); on the
 * client, it returns the real language. This avoids the React 19
 * `react-hooks/set-state-in-effect` error that an `useEffect` +
 * `setLang(initial)` pair would trip (cascading renders) and means
 * the very first client render already shows the right language.
 *
 * The hook also subscribes to the `nethub:langchange` event so that
 * when one component changes the language (via `setLangAndPersist`),
 * every other `useClientLang()` consumer on the page picks up the
 * change without prop-drilling. The subscription lives in a
 * `useEffect` — that part *is* allowed to call setState, because
 * the setState is wrapped in the event callback, not the effect
 * body itself.
 *
 * The four pages that used to duplicate the
 * `useState<Lang>("en") + readLangFromUrl effect + URL/storage/
 * event rewrite` dance — `landing-content`, `explore-content`,
 * `not-found`, `error`, `explore/error` — now consume this hook.
 */
export function useClientLang(): readonly [Lang, (next: Lang) => void] {
  // Lazy initializer: SSR returns "en", first client render
  // returns the real language from URL / storage / navigator. No
  // `useEffect` + `setLang` is required, which is the only way to
  // satisfy the `react-hooks/set-state-in-effect` rule.
  const [lang, setLang] = useState<Lang>(() => resolveInitialLang());

  // Listen for sibling components' language switches. The setState
  // is inside the event callback, not the effect body, so it does
  // not count as "calling setState synchronously within an
  // effect" — the rule is about *body* synchronous setState, which
  // is what causes the cascading render, and that pattern is
  // explicitly allowed when responding to an external subscription.
  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ lang: Lang }>).detail;
      if (detail?.lang && detail.lang !== lang) {
        setLang(detail.lang);
      }
    };
    window.addEventListener("nethub:langchange", onChange);
    return () => window.removeEventListener("nethub:langchange", onChange);
  }, [lang]);

  // User-initiated change: update state, rewrite the URL, persist,
  // and broadcast to other components in a single function call.
  // `setLangAndPersist` already does the URL/storage/event triplet.
  const setLangFromUi = useCallback((next: Lang) => {
    setLang(next);
    setLangAndPersist(next);
  }, []);

  return [lang, setLangFromUi] as const;
}
