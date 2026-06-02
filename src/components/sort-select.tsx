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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#58a6ff]"
      aria-label={t(lang, "sort.aria_label")}
    >
      <option value="default">{t(lang, "sort.default")}</option>
      <option value="stars">{t(lang, "sort.stars")}</option>
      <option value="name">{t(lang, "sort.name")}</option>
      <option value="updated">{t(lang, "sort.updated")}</option>
    </select>
  );
}
