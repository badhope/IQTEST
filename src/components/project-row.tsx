'use client';

import type { Project } from '@/types/project';
import { t } from '@/lib/i18n';
import { PlatformBadges, StatusBadge, VerdictBadge } from './project-row/project-badges';
import { ProjectMeta } from './project-row/project-meta';
import { useLang } from '@/components/lang-provider';

interface ProjectRowProps {
  project: Project;
}

/**
 * Project row in the /explore table.
 *
 * Layout (left → right):
 *   1. **Name** + author + ↗ icon (the name itself is a link).
 *   2. **Description** + tags.
 *   3. **Platforms** badges.
 *   4. **Meta** (stars, last commit, license).
 *   5. **Status** / **Verdict** badges.
 *
 * The row reads its active language from the global `LangProvider`
 * context, so the `data-label` attributes (which surface as
 * column titles in the mobile stacked layout) and the badges
 * re-render when the user switches language. The static project
 * data — name, author, description, tags, repository URL — is
 * never translated, so those stay put across all three languages.
 *
 * The CSS in `globals.css` drives the left-rail pulse,
 * background tint, and ↗ icon slide. The user gets visible
 * feedback before the new tab opens.
 */
export function ProjectRow({ project: p }: ProjectRowProps) {
  const { lang } = useLang();
  // Strip the scheme for the inline display so `github.com/x/y` reads
  // as a domain, not as a 40-character URL. Keep the full URL as the
  // link target so the user can right-click → copy.
  const displayUrl = p.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <tr className="proj-row">
      <td data-label={t(lang, 'table.col.name')} className="proj-name-cell">
        <div className="name">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${p.name} — open repository in a new tab`}
            aria-label={`${p.name} — open repository in a new tab`}
            className="proj-name-link"
          >
            <span className="proj-name-text">{p.name}</span>
            <span className="proj-author">@{p.author}</span>
            <span className="ext-icon" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-url"
          aria-label={`${p.name} — open ${displayUrl} in a new tab`}
          title={p.url}
        >
          <svg
            className="repo-url-icon"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="repo-url-text">{displayUrl}</span>
          <span className="repo-url-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
        <p className="desc mt-2">{p.description}</p>
        <p className="tag mt-1.5 truncate">
          {p.tags
            .slice(0, 6)
            .map((tag) => `#${tag}`)
            .join('  ')}
        </p>
      </td>
      <td className="hide-md" data-label={t(lang, 'table.col.platforms')}>
        <PlatformBadges project={p} />
      </td>
      <ProjectMeta project={p} />
      <td className="hide-md" data-label={t(lang, 'table.col.status')}>
        <StatusBadge status={p.status} />
      </td>
      <td className="hide-md" data-label={t(lang, 'table.col.verdict')}>
        <VerdictBadge verdict={p.verdict ?? ''} />
      </td>
    </tr>
  );
}
