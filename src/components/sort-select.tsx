"use client";

import { t, Lang } from "@/lib/i18n";
import { SortOption } from "@/types/project";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  lang: Lang;
}

export function SortSelect({ value, onChange, lang }: SortSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-[38px] appearance-none border border-dim bg-transparent py-2 pl-3 pr-8 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-2 focus:border-accent focus:text-fg focus:outline-none"
        aria-label={t(lang, "sort.aria_label")}
      >
        <option value="default">{t(lang, "sort.default")}</option>
        <option value="stars">{t(lang, "sort.stars")}</option>
        <option value="name">{t(lang, "sort.name")}</option>
        <option value="updated">{t(lang, "sort.updated")}</option>
      </select>
      <svg
        aria-hidden
        className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="square" d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
