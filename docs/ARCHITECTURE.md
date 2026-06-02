# Architecture

A short tour of how the codebase is wired together.

## 1. High-level flow

```
data/projects.json
        │
        ▼
 src/lib/projects.ts        ← accessors (getAllProjects, getCategoryCounts, …)
        │
        ▼
 src/components/*.tsx       ← pure UI, takes props
        │
        ▼
 src/app/**/*.tsx           ← page shells (landing / explore / 404 / error)
        │
        ▼
 next build (output: "export")
        │
        ▼
 out/                       ← static HTML + /NetTools-Hub/_next/*
        │
        ▼
 GitHub Pages
```

## 2. i18n

- All UI strings live in **`src/lib/i18n.ts`** as a 3-column table (`en` / `zh` / `ja`).
- The current language is read from `?lang=` URL param at runtime (no cookies, no localStorage — keeps the site shareable).
- Missing keys fall back to English and warn to the console.
- The `t(lang, key, params?)` function supports `{var}` interpolation.

## 3. Data model

`data/projects.json` is the **single source of truth**. Each entry conforms to `src/types/project.ts`. The TypeScript types are hand-written (no codegen) to keep the build fast.

## 4. Why a static export?

- **Free hosting** via GitHub Pages
- **CDN-friendly** — every page is pre-rendered HTML
- **No backend to maintain** — nothing to hack, no database to back up
- **Trivial to fork** — change the `homepage` and re-deploy

## 5. Why Tailwind v4?

- **Zero CSS bundle** if a class isn't used (via `@tailwindcss/postcss`)
- **Design tokens** live in `globals.css` as `@theme { … }` — easy to keep the GitHub-dark vibe consistent
- No runtime CSS-in-JS cost

## 6. Why no React state library?

The site has zero global state beyond the current `?lang=` and `?category=` URL params. We use `useState` for purely local UI (sidebar collapse, dropdown open, search input value).

## 7. Folder layout

| Path | Purpose |
|---|---|
| `src/app/` | Next.js App Router pages: `/`, `/explore`, `/not-found`, `/error`, `/robots.ts`, `/sitemap.ts` |
| `src/components/` | Reusable UI: `sidebar`, `project-card`, `project-list`, `language-switcher`, `top-nav`, `search-bar`, `sort-select`, `stats-bar` |
| `src/lib/` | Pure modules: `projects.ts` (data access), `i18n.ts` (trilingual table), `category-groups.ts` (the 6-group taxonomy), `utils.ts` |
| `src/types/` | TypeScript types (single source: `project.ts`) |
| `data/projects.json` | 124 curated projects (the content) |
| `public/` | Static assets (favicons, robots overrides) |
| `docs/` | User-facing documentation |
