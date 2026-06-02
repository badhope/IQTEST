"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ProjectCategory, Lang } from "@/types/project";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

interface SidebarProps {
  categories: Record<string, ProjectCategory>;
  counts: Record<string, number>;
  lang: Lang;
  onLangChange?: (lang: Lang) => void;
}

export function Sidebar({ categories, counts, lang, onLangChange }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const totalProjects = Object.values(counts).reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        onClick={toggle}
        className="fixed top-3 right-3 z-[60] flex h-10 w-10 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] transition-all duration-200 hover:bg-[#21262d] active:scale-95 lg:hidden"
        aria-label={open ? t(lang, "sidebar.close") : t(lang, "sidebar.open")}
      >
        {open ? (
          <svg className="h-5 w-5 text-[#e6edf3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5 text-[#e6edf3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-[55] flex h-full w-60 flex-col border-l border-[#30363d] bg-[#161b22] shadow-2xl transition-all duration-300 lg:translate-x-0 lg:right-auto lg:left-0 lg:border-l-0 lg:border-r lg:shadow-none ${
          open
            ? "translate-x-0"
            : "translate-x-full lg:translate-x-0"
        }`}
        aria-label={t(lang, "sidebar.nav_label")}
        role="navigation"
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#30363d] px-4">
          <Link href={lang !== "en" ? `/?lang=${lang}` : "/"} onClick={close} className="flex items-center gap-2 text-lg font-bold">
            <span className="text-xl">🛠️</span>
            <span className="bg-gradient-to-r from-[#58a6ff] to-[#3fb950] bg-clip-text text-transparent">
              {t(lang, "site.title")}
            </span>
          </Link>
          <div className="lg:hidden">
            <LanguageSwitcher lang={lang} onChange={onLangChange} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <Link
            href={lang !== "en" ? `/explore?lang=${lang}` : "/explore"}
            onClick={close}
            className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#8b949e] transition-colors hover:bg-[#21262d] hover:text-[#e6edf3]"
          >
            <span>📦</span>
            <span className="flex-1">{t(lang, "sidebar.all_projects")}</span>
            <span className="rounded-full bg-[#21262d] px-2 py-0.5 text-xs text-[#6e7681]">
              {totalProjects}
            </span>
          </Link>

          {Object.entries(categories).map(([slug, cat]) => {
            const count = counts[slug] || 0;
            if (count === 0) return null;
            return (
              <Link
                key={slug}
                href={`/explore?category=${slug}${lang !== "en" ? `&lang=${lang}` : ""}`}
                onClick={close}
                className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#8b949e] transition-colors hover:bg-[#21262d] hover:text-[#e6edf3]"
              >
                <span>{cat.icon}</span>
                <span className="flex-1">{cat.name}</span>
                <span className="rounded-full bg-[#21262d] px-2 py-0.5 text-xs text-[#6e7681]">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}