"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lang, t } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CATEGORY_GROUPS } from "@/lib/category-groups";
import { ProjectCategory } from "@/types/project";
import { SiteMark, GroupMark } from "@/components/category-mark";

interface TopNavProps {
  lang: Lang;
  onLangChange?: (lang: Lang) => void;
  categories: Record<string, ProjectCategory>;
  counts: Record<string, number>;
  variant: "landing" | "explore";
}

export function TopNav({ lang, onLangChange, categories, counts, variant }: TopNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORY_GROUPS.map((g) => [g.id, true])),
  );

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const langParam = (path: string) => (lang !== "en" ? `${path}?lang=${lang}` : path);
  const homeHref = langParam("/");
  const exploreHref = langParam("/explore");
  const primaryCta = variant === "landing" ? t(lang, "editorial.open_atlas") : t(lang, "nav.home");
  const primaryHref = variant === "landing" ? exploreHref : homeHref;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link
            href={homeHref}
            className="group flex shrink-0 items-center gap-2.5 text-fg"
          >
            <SiteMark
              size={22}
              className="text-accent transition-transform duration-500 group-hover:rotate-45"
            />
            <span className="hidden font-display text-[1.05rem] font-medium leading-none tracking-tight sm:inline">
              {t(lang, "site.title")}
            </span>
          </Link>

          <span
            aria-hidden
            className="hidden h-5 w-px shrink-0 bg-dim md:inline-block"
          />

          <span className="kicker hidden md:inline-block">
            {t(lang, "editorial.edition", { date: "2026" })}
          </span>

          <div className="flex-1" />

          <LanguageSwitcher lang={lang} onChange={onLangChange} />

          <Link
            href={primaryHref}
            className="link-editorial inline-flex h-9 items-center gap-2 px-1 text-sm"
          >
            <span className="hidden sm:inline">{primaryCta}</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center border border-dim text-fg-2 transition-colors hover:border-accent hover:text-accent lg:hidden"
            aria-label={t(lang, "nav.menu")}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="square" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-bg/80"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(88vw,360px)] flex-col border-l border-line bg-bg-elev">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <span className="kicker">{t(lang, "nav.categories")}</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-fg-2 hover:text-accent"
                aria-label={t(lang, "nav.close")}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="square" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-5">
              {CATEGORY_GROUPS.map((group, idx) => {
                const isOpen = expandedGroups[group.id];
                return (
                  <div key={group.id} className="mb-5 last:mb-0">
                    <button
                      onClick={() =>
                        setExpandedGroups((prev) => ({
                          ...prev,
                          [group.id]: !prev[group.id],
                        }))
                      }
                      className="editorial-index mb-2 w-full text-left"
                      data-index={String(idx + 1).padStart(2, "0")}
                    >
                      <span className="flex shrink-0 items-center gap-2 text-fg-2">
                        <GroupMark id={group.id} size={14} />
                        <span className="font-display text-sm text-fg">
                          {t(lang, group.labelKey)}
                        </span>
                      </span>
                    </button>
                    {isOpen && (
                      <ul className="space-y-0.5">
                        {group.slugs.map((slug) => {
                          const cat = categories[slug];
                          if (!cat || (counts[slug] || 0) === 0) return null;
                          return (
                            <li key={slug}>
                              <Link
                                href={
                                  lang !== "en"
                                    ? `/explore?category=${slug}&lang=${lang}`
                                    : `/explore?category=${slug}`
                                }
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-between gap-2 px-3 py-2 text-sm text-fg-2 transition-colors hover:bg-bg-sunk hover:text-fg"
                              >
                                <span className="truncate">{cat.name}</span>
                                <span className="font-mono text-[10px] text-muted">
                                  {counts[slug] || 0}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="shrink-0 border-t border-line p-4">
              <LanguageSwitcher lang={lang} onChange={onLangChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
