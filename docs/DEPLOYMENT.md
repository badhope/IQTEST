# Deployment · 部署 · デプロイ

Forking and deploying your own instance of **NetTools Hub** takes about 5 minutes.

> 🇬🇧 English (default) · 🇨🇳 [简体中文](./DEPLOYMENT.zh.md) · 🇯🇵 [日本語](./DEPLOYMENT.ja.md)

---

## 1. Prerequisites

- A **GitHub** account
- **Node 22+** and **pnpm 10+** installed locally (only needed if you want to test the build)

---

## 2. Fork

Click **Fork** in the top-right of the repository page. GitHub creates a copy under your account:

```
https://github.com/<your-username>/NetTools-Hub
```

---

## 3. Configure the basePath (only if you change the repo name)

By default, the site is built to be served at:

```
https://<your-username>.github.io/NetTools-Hub/
```

This is set by `basePath: "/NetTools-Hub"` in [`next.config.ts`](../next.config.ts). If you **rename** your repo, you must update this value. For example, if you rename to `proxy-hub`:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/proxy-hub",          // ← match your new repo name
  trailingSlash: true,
  images: { unoptimized: true },
};
```

Then update the `homepage` in [`package.json`](../package.json):

```json
"homepage": "https://<your-username>.github.io/proxy-hub"
```

> 💡 Want to deploy to **your own domain** instead? See Section 5 below.

---

## 4. Enable GitHub Pages

In your fork:

1. Go to **Settings → Pages**
2. **Source**: **GitHub Actions**
3. Save

That's it. The next push to `main` (or the Actions tab on this very fork) will trigger `.github/workflows/deploy.yml`, which:

1. Sets up Node 22 + pnpm 10
2. Installs deps with `pnpm install --frozen-lockfile`
3. Builds with `next build`
4. Uploads the artifact
5. Deploys via `actions/deploy-pages@v4`

Your site will be live at `https://<your-username>.github.io/NetTools-Hub/` within a couple of minutes.

---

## 5. Custom domain

1. In your fork, create a file `public/CNAME` with your domain:

   ```
   proxy.example.com
   ```

2. In your DNS provider, add a CNAME record:

   ```
   proxy.example.com  →  <your-username>.github.io.
   ```

3. In **Settings → Pages → Custom domain**, enter `proxy.example.com` and wait for the green check.

4. (Optional) Enable **Enforce HTTPS** in the same page once the certificate is provisioned.

---

## 6. Customising the data

The entire directory is one file: [`data/projects.json`](../data/projects.json).

- To **add** a project, see [`CONTRIBUTING.md`](../CONTRIBUTING.md) → "Adding or editing a project".
- To **remove** a project, delete its entry.
- To **edit** a project, change any field — the TypeScript types in [`src/types/project.ts`](../src/types/project.ts) are the source of truth.

After pushing your changes, the deploy workflow will publish the new list within minutes.

---

## 7. Local preview

```bash
git clone https://github.com/<your-username>/NetTools-Hub.git
cd NetTools-Hub
pnpm install --frozen-lockfile
pnpm dev                 # http://localhost:8080
```

To preview the production build:

```bash
pnpm build
pnpm start               # http://localhost:8080
```

---

## 8. Troubleshooting

| Symptom | Fix |
|---|---|
| `404` on every `_next/*` asset | `basePath` in `next.config.ts` doesn't match the repo name |
| Sub-pages (`/explore`) give 404 | Make sure `trailingSlash: true` is set in `next.config.ts` |
| Action tab shows the run but Pages is still empty | Wait 1–2 minutes — `actions/deploy-pages@v4` has a small post-deploy delay |
| Want to undo a deploy | Use **Actions → Deploy to GitHub Pages → Re-run jobs from failed**, or roll back the commit and push |

For more, see [`CONTRIBUTING.md`](../CONTRIBUTING.md) and [`ARCHITECTURE.md`](./ARCHITECTURE.md).
