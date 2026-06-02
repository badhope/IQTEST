# Contributing to NetTools Hub

> **Language:** **🇬🇧 English** · [🇨🇳 简体中文](CONTRIBUTING.zh.md) · [🇯🇵 日本語](CONTRIBUTING.ja.md)

First off, thanks for taking the time to contribute! 🎉
NetTools Hub is a community-curated navigation platform for open-source network tools, and every contribution — from a typo fix to a new project entry — makes it better.

This document covers everything you need to send a high-quality pull request (PR) or file a useful issue.

---

## 📑 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [What Can I Contribute?](#-what-can-i-contribute)
- [Reporting Bugs](#-reporting-bugs)
- [Suggesting a New Tool / Feature](#-suggesting-a-new-tool--feature)
- [Local Development Setup](#-local-development-setup)
- [Project Structure](#-project-structure)
- [Adding or Updating a Project Entry](#-adding-or-updating-a-project-entry)
- [Code Style](#-code-style)
- [Commit Message Convention](#-commit-message-convention)
- [Pull Request Process](#-pull-request-process)
- [Localization (i18n)](#-localization-i18n)
- [Need Help?](#-need-help)

---

## 🤝 Code of Conduct

This project and everyone participating in it is governed by the [Contributor Covenant v2.1](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior via GitHub Issues.

---

## 🧩 What Can I Contribute?

- **New tool entries** in `data/projects.json`
- **Update stale data** (broken URLs, outdated star counts, deprecated projects)
- **Translation improvements** for the trilingual UI (English / 中文 / 日本語)
- **Bug fixes** for layout, search, sort, language switching
- **Performance / accessibility improvements**
- **Documentation** (typo fixes, clearer explanations in README)

---

## 🐛 Reporting Bugs

Before opening a bug report, please:

1. **Search existing issues** to avoid duplicates.
2. Use the latest `main` branch — your bug may already be fixed.
3. Collect diagnostic info: browser version, OS, device, screenshot, console errors.

Open an issue at <https://github.com/badhope/NetTools-Hub/issues/new> with:

- A clear, descriptive title
- Steps to reproduce (numbered)
- Expected vs. actual behavior
- Screenshots / screen recordings
- Console / network logs (redact any personal data first)

---

## 💡 Suggesting a New Tool / Feature

For new project entries, please open an issue using the **"Project submission"** template (or include the fields below) so we can verify activity and quality:

- **Repo URL** (GitHub only)
- **Project name** and one-line description
- **Primary language / framework**
- **License** (must be OSI-approved, e.g. MIT / Apache-2.0 / GPL / BSD)
- **Stars** and **last commit date** (we re-check both)
- **Category** — pick from one of the 21 sub-categories (under 6 themed groups) in `data/projects.json` or propose a new one with justification. See the [🗂 6 themed groups section in README](./README.md#-the-6-themed-groups-21-sub-categories) for the full list.
- **Why it deserves to be listed** — 1–2 sentences on what makes it stand out

> Inclusion criteria: actively maintained (commit in the last 6 months), non-abandoned, solves a real networking need, and ideally fills a gap not already covered.

For feature requests, open an issue with the **"Feature request"** label and describe the user value, the proposed UX, and any alternatives you considered.

---

## 🛠 Local Development Setup

### Prerequisites

- **Node.js** `>= 22.0.0` (see `.nvmrc`)
- **pnpm** `>= 10.0.0` (see `.npmrc`)
- A modern browser (Chrome / Firefox / Safari / Edge, latest 2 versions)

### Steps

```bash
# 1. Fork and clone the repo
git clone https://github.com/<your-username>/NetTools-Hub.git
cd NetTools-Hub

# 2. Install dependencies
pnpm install --frozen-lockfile

# 3. Start the dev server (port 8080)
pnpm dev

# 4. Open http://localhost:8080
```

### Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start local dev server on port 8080 |
| `pnpm build` | Produce a static export in `./out` |
| `pnpm start` | Serve the built `./out` folder on port 8080 |
| `pnpm lint` | Run ESLint with the Next.js + TypeScript rules |

> **Note**: This project is configured with `output: "export"` for static deployment to GitHub Pages. The dev server still works normally — only the production build is fully static.

---

## 🗂 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD
├── data/
│   └── projects.json           # 124 curated projects, 21 sub-categories (6 themed groups)
├── src/
│   ├── app/
│   │   ├── explore/            # /explore — filterable / sortable list
│   │   ├── error.tsx           # Global error boundary
│   │   ├── layout.tsx          # Root layout
│   │   ├── not-found.tsx       # 404 page
│   │   ├── page.tsx            # / — landing page
│   │   ├── robots.ts           # robots.txt
│   │   └── sitemap.ts          # sitemap.xml
│   ├── components/             # UI primitives
│   ├── lib/                    # i18n, data, utilities
│   └── types/                  # TypeScript types
├── public/                     # (optional) static assets
├── LICENSE                     # MIT
├── README.md                   # Trilingual docs
├── next.config.ts              # `output: "export"`
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs          # Tailwind v4
└── tsconfig.json
```

---

## 📝 Adding or Updating a Project Entry

All data lives in **`data/projects.json`**. The schema is enforced by `src/types/project.ts`.

### Schema (TypeScript)

```ts
interface Project {
  id: string;              // URL-safe slug, e.g. "sing-box"
  name: string;            // Display name, e.g. "sing-box"
  description: string;     // One-line pitch (English)
  url: string;             // Canonical homepage or repo URL
  category: ProjectCategory;
  tags: string[];          // Free-form, lowercase, hyphenated
  language?: string;       // Primary language, e.g. "Go"
  stars?: number;          // Approximate GitHub stars
  lastUpdate?: string;     // ISO 8601 date, e.g. "2026-05-01"
  license?: string;        // SPDX id, e.g. "MIT"
}
```

### Example entry

```json
{
  "id": "sing-box",
  "name": "sing-box",
  "description": "Universal proxy platform that supports Shadowsocks, Trojan, V2Ray, NaïveProxy, Hysteria, TUIC, etc.",
  "url": "https://github.com/SagerNet/sing-box",
  "category": "proxy-core",
  "tags": ["proxy", "shadowsocks", "trojan", "v2ray", "hysteria", "tuic"],
  "language": "Go",
  "stars": 25000,
  "lastUpdate": "2026-05-30",
  "license": "MIT"
}
```

### Checklist for new entries

- [ ] `id` is lowercase, hyphenated, and unique
- [ ] `url` returns HTTP 200 and is the canonical repo URL
- [ ] `category` exists in the project category enum (or PR a new category)
- [ ] Repo has had a commit in the last **6 months**
- [ ] License is OSI-approved
- [ ] Description is concise (≤ 120 chars) and in English
- [ ] Tags are lowercase, hyphenated, deduplicated
- [ ] JSON is valid (run `pnpm lint` to validate)

> **Sorting & categories** are derived dynamically — you do not need to maintain a manual order.

---

## 🎨 Code Style

- **Language**: TypeScript (strict mode), React 19 function components
- **Styling**: Tailwind CSS v4 utility classes + `@theme` tokens; no inline styles
- **Linting**: `pnpm lint` must pass — fixes the most common issues automatically
- **Components**: small, focused, no boolean-prop proliferation (see `vercel-composition-patterns` for guidance)
- **Accessibility**: every interactive element has a clear focus state and `aria-label` where needed
- **Responsive**: mobile-first; tested on ≥ 360px (mobile), 768px (tablet), 1280px (desktop)

Run before opening a PR:

```bash
pnpm lint
pnpm build
```

---

## 🧾 Commit Message Convention

We follow **Conventional Commits** so the history stays scannable and we can automate changelogs later.

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

Common types:

| Type | Use for |
| --- | --- |
| `feat` | A new user-visible feature |
| `fix` | A bug fix |
| `docs` | Documentation only (README, CONTRIBUTING, etc.) |
| `style` | Formatting, missing semicolons, no code change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `chore` | Tooling, deps, CI, non-code changes |
| `data` | Updates to `data/projects.json` |

Examples:

```
feat(search): add debounced 300ms input handling
fix(sidebar): preserve lang param when navigating
data: add sing-box v1.11 release entry
docs: clarify GitHub Pages build_type in README
```

---

## 🔁 Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feat/<short-description>
   ```
2. **Make focused commits** — one logical change per commit, with a Conventional Commit message.
3. **Run checks** locally:
   ```bash
   pnpm lint
   pnpm build
   ```
   Both must pass cleanly.
4. **Push and open a PR** against `main` at <https://github.com/badhope/NetTools-Hub/pulls>.
5. **Fill the PR template** — describe the change, link related issues (`Fixes #123`), and attach screenshots / screen recordings for UI changes.
6. **Wait for review** — maintainers will respond within a few days. Be open to feedback; small nitpicks are normal.
7. **Squash-merge** is the default merge strategy, so the final history stays linear.

> PRs that don't follow the template or fail CI may be asked to revise before review.

---

## 🌐 Localization (i18n)

The UI is trilingual: **English (default) / 中文 / 日本語**. Translation strings live in `src/lib/i18n.ts`.

To add or fix a translation:

1. Open `src/lib/i18n.ts`.
2. Add the new key to **all three** language blocks (or fix the missing/incorrect ones).
3. Keep technical terms consistent with the rest of the project.
4. For Japanese, prefer natural phrasing over literal translation (e.g. use 梯子 / 翻墙 carefully; many readers prefer プロキシ or VPN).

If you only speak one of the three languages, **partial PRs are still welcome** — others can fill in the rest.

---

## 🆘 Need Help?

- **Issues**: <https://github.com/badhope/NetTools-Hub/issues>
- **Discussions**: <https://github.com/badhope/NetTools-Hub/discussions>
- **README**: see the deployment and FAQ sections

Thanks again for contributing — every PR makes the open-source network-tools ecosystem a little more discoverable. 🚀
