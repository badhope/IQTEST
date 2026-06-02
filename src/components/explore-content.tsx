"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { StatsBar } from "@/components/stats-bar";
import { SearchBar } from "@/components/search-bar";
import { SortSelect } from "@/components/sort-select";
import { ProjectList } from "@/components/project-list";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  getAllProjects,
  searchProjects,
  getCategoryCounts,
  getCategories,
} from "@/lib/projects";
import { t, Lang } from "@/lib/i18n";
import { SortOption } from "@/types/project";

function isValidLang(value: string | null): value is Lang {
  return value === "en" || value === "zh" || value === "ja";
}

export function ExploreContent() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [category, setCategory] = useState("");
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (isValidLang(urlLang)) setLang(urlLang);
    const urlQuery = params.get("q") || "";
    if (urlQuery) setQuery(urlQuery);
    const urlSort = (params.get("sort") as SortOption) || "default";
    if (["default", "stars", "name", "updated"].includes(urlSort)) setSort(urlSort);
    const urlCat = params.get("category") || "";
    if (urlCat) setCategory(urlCat);
  }, []);

  const syncUrl = useCallback((updates: Record<string, string | null>) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    for (const [k, v] of Object.entries(updates)) {
      if (v === null || v === "") url.searchParams.delete(k);
      else url.searchParams.set(k, v);
    }
    window.history.replaceState({}, "", url.toString());
  }, []);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    syncUrl({ lang: newLang === "en" ? null : newLang });
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    syncUrl({ q: newQuery || null });
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    syncUrl({ sort: newSort === "default" ? null : newSort });
  };

  const handleCategoryClick = (newCategory: string) => {
    setCategory(newCategory);
    syncUrl({ category: newCategory === category ? null : newCategory });
  };

  const allProjects = getAllProjects();
  const filtered = query
    ? searchProjects(query, category || undefined)
    : category
    ? allProjects.filter((p) => p.category === category)
    : allProjects;
  const stats = getCategoryCounts();
  const categories = getCategories();
  const totalStars = allProjects.reduce((sum, p) => sum + p.stars, 0);
  const categoryCount = Object.keys(stats).length;

  const langParam = lang !== "en" ? `&lang=${lang}` : "";

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Sidebar
        categories={categories}
        counts={stats}
        lang={lang}
        onLangChange={handleLangChange}
      />

      <main className="min-h-screen lg:ml-60">
        <header className="sticky top-0 z-30 border-b border-[#30363d] bg-[#0d1117]/90 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between px-4 pr-14 lg:pr-4">
            <Link
              href={lang !== "en" ? `/?lang=${lang}` : "/"}
              className="flex items-center gap-2"
            >
              <span className="text-lg">🛠️</span>
              <span className="bg-gradient-to-r from-[#58a6ff] to-[#3fb950] bg-clip-text text-sm font-bold text-transparent">
                {t(lang, "site.title")}
              </span>
            </Link>
            <div className="hidden lg:block">
              <LanguageSwitcher lang={lang} onChange={handleLangChange} />
            </div>
          </div>

          <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <StatsBar
              projectCount={allProjects.length}
              categoryCount={categoryCount}
              totalStars={totalStars}
              lang={lang}
            />
            <div className="flex items-center gap-2">
              <SearchBar value={query} onChange={handleQueryChange} lang={lang} />
              <SortSelect value={sort} onChange={handleSortChange} lang={lang} />
            </div>
          </div>

          {category && (
            <div className="border-t border-[#21262d] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{categories[category]?.icon || "📁"}</span>
                <h1 className="text-lg font-bold text-[#e6edf3]">
                  {t(lang, "category.header", { name: categories[category]?.name || category.replace(/_/g, " ") })}
                </h1>
                <span className="rounded-full border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-xs text-[#8b949e]">
                  {t(lang, "category.count", { count: filtered.length })}
                </span>
              </div>
            </div>
          )}
        </header>

        {filtered.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 text-center">
            <span className="text-5xl">🔍</span>
            <h2 className="mt-4 text-lg font-semibold text-[#e6edf3]">
              {t(lang, "empty.title")}
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#8b949e]">
              {t(lang, "empty.description")}
            </p>
            {(query || category) && (
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("");
                  syncUrl({ q: null, category: null });
                }}
                className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2 text-sm text-[#58a6ff] transition-colors hover:bg-[#21262d]"
              >
                {t(lang, "empty.clear")}
              </button>
            )}
          </div>
        ) : (
          <ProjectList
            projects={filtered}
            sort={sort}
            stats={stats}
            categories={categories}
            lang={lang}
          />
        )}
      </main>
    </div>
  );
}
