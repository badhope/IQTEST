"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Project, SortOption, ProjectCategory } from "@/types/project";
import { Lang, t } from "@/lib/i18n";
import { ProjectCard } from "@/components/project-card";
import { CATEGORY_GROUPS } from "@/lib/category-groups";
import { GroupMark, CategoryMark } from "@/components/category-mark";

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
            new Date(b.lastCommit).getTime() - new Date(a.lastCommit).getTime(),
        );
      default:
        return copy;
    }
  }, [projects, sort]);

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted">
        <span className="font-display text-3xl text-fg-2">
          {t(lang, "list.not_found")}
        </span>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em]">
          {t(lang, "list.try_again")}
        </p>
      </div>
    );
  }

  if (sort !== "default") {
    return (
      <div className="px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-6 flex items-center justify-between border-b border-line pb-3">
          <span className="kicker">
            {t(lang, "list.found", { count: projects.length })}
          </span>
          <span className="font-mono text-[10px] text-muted">
            {String(projects.length).padStart(3, "0")}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  }

  const groupedByGroup = CATEGORY_GROUPS.map((group) => {
    // Under noUncheckedIndexedAccess, `stats[s]` is `number | undefined`.
    // `?? 0` is the safe coercion; an absent stat means "0 projects".
    const slugs = group.slugs.filter((s) => (stats[s] ?? 0) > 0);
    const groupProjects = slugs.flatMap((slug) => sorted.filter((p) => p.category === slug));
    if (groupProjects.length === 0) return null;
    return { group, groupProjects };
  }).filter((g): g is { group: typeof CATEGORY_GROUPS[number]; groupProjects: Project[] } => g !== null);

  return (
    <div className="space-y-16 px-5 py-8 sm:space-y-20 sm:px-8 sm:py-10">
      {groupedByGroup.map(({ group, groupProjects }, gIdx) => (
        <section key={group.id} id={`group-${group.id}`}>
          <header className="mb-7 flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <h2 className="flex items-baseline gap-3 font-display text-2xl text-fg">
              <span className="font-mono text-[11px] text-muted">
                {String(gIdx + 1).padStart(2, "0")}
              </span>
              <GroupMark
                id={group.id}
                size={20}
                className="self-center text-fg-2"
              />
              <span>{t(lang, group.labelKey)}</span>
            </h2>
            <span className="font-mono text-[11px] text-muted">
              {t(lang, "editorial.summary", { n: groupProjects.length, m: group.slugs.filter((s) => (stats[s] ?? 0) > 0).length })}
            </span>
          </header>

          <div className="space-y-12">
            {group.slugs.filter((s) => (stats[s] ?? 0) > 0).map((slug, idx) => {
              const catInfo = categories[slug];
              const catProjects = groupProjects.filter((p) => p.category === slug);
              if (catProjects.length === 0) return null;
              return (
                <div key={slug} id={`cat-${slug}`}>
                  <div className="editorial-index mb-4" data-index={String(idx + 1).padStart(2, "0")}>
                    <Link
                      href={
                        lang !== "en"
                          ? `/explore?category=${slug}&lang=${lang}`
                          : `/explore?category=${slug}`
                      }
                      className="flex items-center gap-2 text-fg-2 transition-colors hover:text-accent"
                    >
                      <CategoryMark
                        slug={slug}
                        size={14}
                        className="text-fg-2"
                      />
                      <span className="font-display text-base text-fg">
                        {catInfo?.name || slug}
                      </span>
                      <span className="font-mono text-[10px] text-muted">
                        {String(catProjects.length).padStart(2, "0")}
                      </span>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {catProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
