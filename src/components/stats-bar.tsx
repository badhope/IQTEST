"use client";

import { t, Lang } from "@/lib/i18n";

interface StatsBarProps {
  projectCount: number;
  categoryCount: number;
  totalStars: number;
  lang: Lang;
}

export function StatsBar({ projectCount, categoryCount, totalStars, lang }: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs" role="status" aria-label="Platform statistics">
      <div className="flex items-center gap-1.5 rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-1.5">
        <span>📦</span>
        <span className="font-semibold text-[#e6edf3]">{projectCount}</span>
        <span className="text-[#8b949e]">{t(lang, "stats.projects")}</span>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-1.5">
        <span>📁</span>
        <span className="font-semibold text-[#e6edf3]">{categoryCount}</span>
        <span className="text-[#8b949e]">{t(lang, "stats.categories")}</span>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-1.5">
        <span>⭐</span>
        <span className="font-semibold text-[#e6edf3]">
          {(totalStars / 1000000).toFixed(1)}M
        </span>
        <span className="text-[#8b949e]">{t(lang, "stats.total_stars")}</span>
      </div>
    </div>
  );
}