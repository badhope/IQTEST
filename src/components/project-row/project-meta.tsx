'use client';

import type { Project } from '@/types/project';
import { t } from '@/lib/i18n';
import { formatNumber } from '@/lib/utils';
import { useLang } from '@/components/lang-provider';

export function ProjectMeta({ project }: { project: Project }) {
  const { lang } = useLang();
  return (
    <>
      <td className="num text-right" data-label={t(lang, 'table.col.stars')}>
        {formatNumber(project.stars, lang)}
        {project.forks > 0 && (
          <span className="ml-1 text-muted">/ {formatNumber(project.forks, lang)}</span>
        )}
      </td>
      <td className="hide-md num" data-label={t(lang, 'table.col.last_commit')}>
        {project.lastCommit}
      </td>
      <td className="hide-md num" data-label={t(lang, 'table.col.license')}>
        {project.license}
      </td>
    </>
  );
}
