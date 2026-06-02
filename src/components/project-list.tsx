"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Project, SortOption, ProjectCategory, Lang } from "@/types/project";
import { t } from "@/lib/i18n";
import { ProjectCard } from "@/components/project-card";

interface ProjectListProps {
  projects: Project[];
  sort: SortOption;
  stats: Record<string, number>;
  categories: Record<string, ProjectCategory>;
  lang: Lang;
}

export function ProjectList({ projects, sort, stats, categories, lang }: ProjectListProps) {
  const sorted = useMemo(() => {
    const copy = [...projects];
    switch (sort) {
      case "stars":
        return copy.sort((a, b) => b.stars - a.stars);
      case "name":
        return copy.sort((a, b) => a.name.localeCompare(b.name, "en"));
      case "updated":
        return copy.sort(
          (a, b) =>
            new Date(b.lastCommit).getTime() - new Date(a.lastCommit).getTime()
        );
      default:
        return copy;
    }
  }, [projects, sort]);

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#6e7681]">
        <span className="text-5xl">🔍</span>
        <p className="mt-4 text-lg">{t(lang, "list.not_found")}</p>
        <p className="mt-1 text-sm">{t(lang, "list.try_again")}</p>
      </div>
    );
  }

  if (sort !== "default") {
    return (
      <div className="p-4 lg:p-6">
        <div className="mb-4 text-sm text-[#8b949e]">
          {t(lang, "list.found", { count: projects.length })}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  }

  const categoryOrder = Object.keys(stats).filter((k) => stats[k] > 0);

  const grouped = categoryOrder.map((cat) => ({
    slug: cat,
    catInfo: categories[cat],
    projects: sorted.filter((p) => p.category === cat),
  })).filter((g) => g.projects.length > 0);

  return (
    <div className="space-y-10 p-4 lg:p-6">
      {grouped.map((group) => (
        <section key={group.slug} id={`cat-${group.slug}`}>
          <div className="mb-4 flex items-center gap-3">
            <Link
              href={`/explore?category=${group.slug}${lang !== "en" ? `&lang=${lang}` : ""}`}
              className="group flex items-center gap-2"
            >
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${group.projects[0]?.gradient[0] || "#58a6ff"}, ${group.projects[0]?.gradient[1] || "#3fb950"})`,
                }}
              />
              <span className="text-base font-semibold text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors">
                {group.catInfo?.icon} {group.catInfo?.name || group.slug}
              </span>
              <span className="rounded-full bg-[#21262d] border border-[#30363d] px-2 py-0.5 text-xs text-[#6e7681]">
                {group.projects.length}
              </span>
              <span className="text-[#6e7681] opacity-0 transition-opacity group-hover:opacity-100 text-sm">
                →
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {group.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}