'use client';

import { Project } from '@/types/project';
import { t } from '@/lib/i18n';
import { ProjectRow } from '@/components/project-row';
import { useLang } from '@/components/lang-provider';

interface ProjectTableProps {
  projects: readonly Project[];
}

/**
 * Project table.
 *
 * Renders the canonical view of a filtered set of projects. Every
 * column is right-aligned or monospace where appropriate; rows are
 * dense (single line of description) so the table is scannable
 * top-to-bottom and a single screen holds 30+ rows on desktop.
 *
 * The "Name" column is the only "wide" one — it shows the project
 * name, a one-line description, and a tag row. The "Stars" /
 * "Last commit" / "License" / "Status" / "Verdict" columns are
 * 3-9 character mono fields that all read from the same line of
 * the table.
 *
 * The component is a client component that reads the active
 * language from the global `LangProvider` context. This is the
 * mechanism that makes the language switcher "actually switch":
 * the table headers, the row data-labels (used in the mobile
 * stacked layout), and the badges inside each row all read
 * `lang` from context and re-render on change.
 */
export function ProjectTable({ projects }: ProjectTableProps) {
  const { lang } = useLang();
  if (projects.length === 0) {
    return (
      <p className="border border-dashed border-dim p-6 text-center text-[13px] text-muted">
        {t(lang, 'table.empty')}
      </p>
    );
  }
  return (
    <table className="proj-table" aria-label={t(lang, 'table.col.name')} role="table">
      <thead>
        <tr>
          <th scope="col">{t(lang, 'table.col.name')}</th>
          <th scope="col" className="hide-md">
            {t(lang, 'table.col.platforms')}
          </th>
          <th scope="col" className="num text-right">
            {t(lang, 'table.col.stars')}
          </th>
          <th scope="col" className="hide-md">
            {t(lang, 'table.col.last_commit')}
          </th>
          <th scope="col" className="hide-md">
            {t(lang, 'table.col.license')}
          </th>
          <th scope="col" className="hide-md">
            {t(lang, 'table.col.status')}
          </th>
          <th scope="col" className="hide-md">
            {t(lang, 'table.col.verdict')}
          </th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <ProjectRow key={p.id} project={p} />
        ))}
      </tbody>
    </table>
  );
}
