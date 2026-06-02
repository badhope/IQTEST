<div align="center">

# 🛠️ NetTools Hub

> **One-stop navigation platform for 120+ actively maintained open-source network tools.**
> Proxies · VPNs · Clash family · GitHub acceleration · DNS · Security · Monitoring

[![Live Site](https://img.shields.io/badge/🌐_Live_NetTools_Hub-blue?style=for-the-badge)](https://badhope.github.io/NetTools-Hub/)
[![MIT License](https://img.shields.io/github/license/badhope/NetTools-Hub?style=flat-square)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/badhope/NetTools-Hub?style=social)](https://github.com/badhope/NetTools-Hub/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/badhope/NetTools-Hub?style=flat-square)](https://github.com/badhope/NetTools-Hub/issues)
[![Last commit](https://img.shields.io/github/last-commit/badhope/NetTools-Hub?style=flat-square)](https://github.com/badhope/NetTools-Hub/commits/main)
[![Deploy](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222?logo=github&style=flat-square)](https://github.com/badhope/NetTools-Hub/deployments)

</div>

---

## 🎯 What is this repository?

**NetTools Hub** is a **static navigation website** that helps you discover and compare actively-maintained open-source network tools. All data lives in a single JSON file ([`data/projects.json`](./data/projects.json)) and the site is automatically built and deployed to **GitHub Pages** — no backend, no database, no tracking, no ads.

| 💡 What it is | ❌ What it is NOT |
|---|---|
| A curated **directory** of network tool projects | Not a VPN service or proxy provider |
| A **searchable catalog** with filters and sorting | Not a hosting platform for the listed tools |
| A **static site** built with Next.js + React | Not a SaaS / paid product |
| **100% free & open source** under MIT | Not a content scraper (data is hand-curated) |

---

## 🚀 How to use it

### 👤 As a user (just want to find a tool)

1. **Open the live site**: 👉 <https://badhope.github.io/NetTools-Hub/>
2. **Browse or search** — pick a category from the sidebar, or type keywords into the search bar (search by name, author, tag, or description).
3. **Click a card** to jump to the project's GitHub repo and read the docs.

The site is fully responsive and works on **desktop / tablet / mobile**. A language switcher (top right) lets you toggle between **English / 中文 / 日本語**.

### 🛠️ As a developer / contributor (want to run or modify it)

```bash
git clone https://github.com/badhope/NetTools-Hub.git
cd NetTools-Hub
pnpm install --frozen-lockfile   # requires Node 22+ & pnpm 10+
pnpm dev                          # http://localhost:8080
```

To build the static site locally:

```bash
pnpm build        # produces ./out (static export)
pnpm start        # serve the build at http://localhost:8080
```

Then read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for how to add a project, propose a fix, or submit a PR.

### 🚢 As a maintainer (want to fork & deploy your own)

This repo ships with a ready-to-use **GitHub Actions** workflow. After forking:

1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — `.github/workflows/deploy.yml` will build and deploy automatically.

Your fork will be live at `https://<your-username>.github.io/NetTools-Hub/`.

---

## ✨ Features

- 🔍 **Smart search** — match by name, author, tag, or description (debounced 300ms)
- 📊 **Multi-dimensional sort** — by ⭐ stars, name, or last update
- 🗂 **21 categories** — proxy cores, GUI clients, GitHub acceleration, DNS, security, monitoring…
- 🌐 **Trilingual UI** — English / 中文 / 日本語
- 📱 **Fully responsive** — desktop, tablet, mobile
- ⚡ **Static export** — light-speed load from GitHub Pages CDN
- 🔒 **SEO ready** — `robots.txt`, `sitemap.xml`, OpenGraph, Twitter Card
- ♿ **Accessible** — ARIA labels, `focus-visible`, keyboard navigation
- 🎯 **Curated quality** — only projects active in the last 6 months

---

## 📸 Preview

🌐 **Live demo**: <https://badhope.github.io/NetTools-Hub/>

The site has two main views:

- **`/` — Landing page** — hero, feature highlights, category grid, call-to-action
- **`/explore` — Browse & search** — sidebar with 21 categories, real-time search, sort dropdown, project grid

---

## 🗂 Project structure

```
NetTools-Hub/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages auto-deploy
├── data/
│   └── projects.json          # 124 projects × 21 categories (the source of truth)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout (metadata, fonts)
│   │   ├── page.tsx           # Landing page
│   │   ├── globals.css        # Tailwind v4 + custom theme tokens
│   │   ├── robots.ts          # /robots.txt
│   │   ├── sitemap.ts         # /sitemap.xml
│   │   ├── not-found.tsx      # 404
│   │   ├── error.tsx          # Global error boundary
│   │   ├── favicon.ico
│   │   └── explore/           # /explore — browse & search
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   ├── components/            # UI: sidebar, cards, search, sort, language switcher…
│   ├── lib/                   # i18n tables, data access, utils
│   └── types/                 # TypeScript types
├── .editorconfig
├── .gitignore
├── .npmrc                     # pnpm@10
├── .nvmrc                     # node 22
├── CODE_OF_CONDUCT.md         # Contributor Covenant v2.1
├── CONTRIBUTING.md            # Full contributor guide
├── SECURITY.md                # Vulnerability disclosure policy
├── LICENSE                    # MIT
├── README.md                  # You are here
├── eslint.config.mjs
├── next.config.ts             # output: "export" (static)
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs         # Tailwind v4
└── tsconfig.json
```

---

## 🛠 Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Static export, RSC, file-based routing |
| UI | **React 19** | Latest stable |
| Styling | **Tailwind CSS v4** | `@import "tailwindcss"` + `@theme` tokens |
| Language | **TypeScript 5.9** | Strict mode |
| Package manager | **pnpm 10** | Fast, disk-efficient |
| Hosting | **GitHub Pages** | Free, fast CDN, no vendor lock-in |
| CI/CD | **GitHub Actions** | `actions/checkout@v4` + `pnpm/action-setup@v4` + `actions/deploy-pages@v4` |

---

## ➕ Adding or editing a project

All content is in a **single JSON file** — no CMS, no migration scripts.

1. Open [`data/projects.json`](./data/projects.json).
2. Add or edit an entry following this schema (also typed in [`src/types/project.ts`](./src/types/project.ts)):

   ```json
   {
     "id": "sing-box",
     "name": "sing-box",
     "description": "Universal proxy platform…",
     "url": "https://github.com/SagerNet/sing-box",
     "category": "proxy-core",
     "tags": ["proxy", "shadowsocks", "trojan"],
     "language": "Go",
     "stars": 25000,
     "lastUpdate": "2026-05-30",
     "license": "MIT"
   }
   ```

3. Open a PR. The CI will deploy a preview on the next push to `main`.

> ✅ Inclusion criteria: active commits within the last 6 months, OSI-approved license, and a real-world use case. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full guide.

---

## 📑 The 21 categories

⚙️ Proxy Cores · 🖥️ GUI Clients · 📋 Subscription Management
🚀 GitHub Acceleration · 🌏 Router Plugins · 🐳 Docker Deployment
📜 Rule Collections · 🛠️ Utilities · 🪞 Mirror Acceleration
📊 Network Testing · 📍 Node Tools · 🔐 Protocol Tools
🖥️ Server Management · 🛡️ Security Tools · 📤 Data Transfer
📊 Monitoring Tools · ☸️ Container Orchestration · 🕳️ Tunnel Tools
🌐 DNS Tools · 🔑 Certificate Tools · 🗂️ Project Collections

---

## 🤝 Contributing

We welcome PRs! See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for:

- Local dev setup & scripts
- The data schema and how to add a project
- Code style, lint, and **Conventional Commits** (`feat:`, `fix:`, `docs:`, …)
- PR review process
- How to add or improve a translation

By participating, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## 🔐 Security

Found a vulnerability? **Do not open a public Issue.** Follow the private disclosure process in [`SECURITY.md`](./SECURITY.md) — we aim to acknowledge within **3 business days**.

## 📄 License

Distributed under the [MIT License](./LICENSE).

---

## ⭐ Star history

If this project helped you discover a useful tool, consider giving it a star — it helps others find it too.

[![Star History Chart](https://api.star-history.com/svg?repos=badhope/NetTools-Hub&type=Date)](https://star-history.com/#badhope/NetTools-Hub&Date)

---

## 🌐 Read this README in other languages

**📖 You are reading: English (default)**

<details>
<summary>🇨🇳 <b>中文版</b>（点击展开）</summary>

<br>

> **NetTools Hub** — 120+ 个活跃维护的开源网络工具一站式导航平台
> 代理 · VPN · Clash 家族 · GitHub 加速 · DNS · 安全 · 监控

🌐 **在线访问**：<https://badhope.github.io/NetTools-Hub/>

### 🎯 这是什么仓库？

**NetTools Hub** 是一个**静态导航网站**，帮助你发现和对比活跃维护的开源网络工具。所有数据集中存放在一个 JSON 文件（[`data/projects.json`](./data/projects.json)），并通过 **GitHub Pages** 自动部署 —— 无后端、无数据库、无追踪、无广告。

| 💡 它是什么 | ❌ 它不是什么 |
|---|---|
| 一个**精心策展**的网络工具目录 | 不是 VPN 服务商或代理提供方 |
| 一个**可搜索**的工具目录（带筛选/排序） | 不是所列工具的托管平台 |
| 使用 Next.js + React 构建的**静态站点** | 不是 SaaS / 付费产品 |
| **MIT 协议 100% 免费开源** | 不是内容抓取站（数据均为人工策展） |

### 🚀 怎么用

**👤 普通用户（只想找工具）**

1. 打开在线站点 👉 <https://badhope.github.io/NetTools-Hub/>
2. 浏览或搜索 —— 在侧边栏选择分类，或在搜索框输入关键词（支持按名称、作者、标签、描述搜索）
3. 点击卡片跳转到对应 GitHub 仓库，阅读官方文档

站点完全响应式，**桌面 / 平板 / 手机** 都能用。右上角语言切换器支持 **英文 / 中文 / 日文**。

**🛠️ 开发者 / 贡献者（想运行或修改）**

```bash
git clone https://github.com/badhope/NetTools-Hub.git
cd NetTools-Hub
pnpm install --frozen-lockfile   # 需要 Node 22+ 和 pnpm 10+
pnpm dev                          # http://localhost:8080
```

本地构建：

```bash
pnpm build        # 输出到 ./out（静态导出）
pnpm start        # 启动本地预览，http://localhost:8080
```

贡献流程请阅读 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

**🚢 维护者（想 Fork 并部署自己的版本）**

仓库自带 GitHub Actions 工作流，Fork 后：

1. 进入 **Settings → Pages**
2. **Source** 选择 **GitHub Actions**
3. 推送到 `main` —— `.github/workflows/deploy.yml` 会自动构建并部署

你的 Fork 将部署到 `https://<用户名>.github.io/NetTools-Hub/`。

### ✨ 特性

- 🔍 **智能搜索** —— 按名称、作者、标签、描述匹配（防抖 300ms）
- 📊 **多维排序** —— 按 ⭐ 星数、名称、更新时间
- 🗂 **21 个分类** —— 代理核心、GUI 客户端、GitHub 加速、DNS、安全、监控等
- 🌐 **三语界面** —— English / 中文 / 日本語
- 📱 **完全响应式** —— 桌面、平板、手机
- ⚡ **静态导出** —— GitHub Pages CDN 极速加载
- 🔒 **SEO 完善** —— `robots.txt`、`sitemap.xml`、OpenGraph、Twitter Card
- ♿ **无障碍** —— ARIA 标签、`focus-visible`、键盘导航
- 🎯 **策展质量** —— 仅收录近 6 个月有更新的项目

### 🛠 技术栈

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** + 自定义主题
- **TypeScript 5.9**（严格模式）
- **pnpm 10**
- **GitHub Pages** + **GitHub Actions** CI/CD

### ➕ 添加 / 编辑项目

所有内容都在一个 JSON 文件里 —— 无 CMS、无迁移脚本。打开 [`data/projects.json`](./data/projects.json)，按以下结构添加条目：

```json
{
  "id": "唯一-id",
  "name": "项目名",
  "description": "一句话简介",
  "url": "https://github.com/作者/项目",
  "category": "分类-id",
  "tags": ["标签1", "标签2"],
  "language": "Go",
  "stars": 25000,
  "lastUpdate": "2026-05-30",
  "license": "MIT"
}
```

完整指南见 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

### 🤝 贡献 / 🔐 安全 / 📄 许可证

- 贡献：[`CONTRIBUTING.md`](./CONTRIBUTING.md) / 行为准则：[`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)
- 漏洞披露：[`SECURITY.md`](./SECURITY.md)（3 个工作日内响应）
- 许可证：[MIT](./LICENSE)

如果这个项目帮到你找到了合适的工具，欢迎 Star 支持 ⭐

</details>

<details>
<summary>🇯🇵 <b>日本語版</b>（クリックで展開）</summary>

<br>

> **NetTools Hub** — 120+ 個の活発にメンテナンスされているオープンソースネットワークツールを一元的に集約したナビゲーションプラットフォーム
> プロキシ · VPN · Clash ファミリー · GitHub 高速化 · DNS · セキュリティ · 監視

🌐 **オンラインアクセス**：<https://badhope.github.io/NetTools-Hub/>

### 🎯 このリポジトリについて

**NetTools Hub** は、活発にメンテナンスされているオープンソースのネットワークツールを発見・比較するための**静的ナビゲーションサイト**です。すべてのデータは単一の JSON ファイル（[`data/projects.json`](./data/projects.json)）にまとめられ、**GitHub Pages** に自動デプロイされます。バックエンド、データベース、トラッキング、広告は一切ありません。

| 💡 何か | ❌ 何ではないか |
|---|---|
| ネットワークツールの**厳選ディレクトリ** | VPN サービスやプロキシ提供元ではない |
| 検索・フィルター・並び替え可能な**検索可能カタログ** | 掲載ツールのホスティングプラットフォームではない |
| Next.js + React で構築された**静的サイト** | SaaS / 有料プロダクトではない |
| **MIT ライセンスの 100% フリー & オープンソース** | コンテンツスクレイパーではない（データは手作業で構成） |

### 🚀 使い方

**👤 ユーザー（ツールを探すだけの場合）**

1. オンラインサイトを開く 👉 <https://badhope.github.io/NetTools-Hub/>
2. ブラウズまたは検索 —— サイドバーからカテゴリを選ぶか、検索バーにキーワードを入力（名前、作者、タグ、説明での検索に対応）
3. カードをクリックして該当 GitHub リポジトリへ移動し、公式ドキュメントを読む

サイトは完全レスポンシブ対応で、**デスクトップ / タブレット / モバイル** で動作します。右上の言語スイッチャーで **英語 / 中文 / 日本語** を切り替えられます。

**🛠️ 開発者 / コントリビューター（実行・改変したい場合）**

```bash
git clone https://github.com/badhope/NetTools-Hub.git
cd NetTools-Hub
pnpm install --frozen-lockfile   # Node 22+ と pnpm 10+ が必要
pnpm dev                          # http://localhost:8080
```

ローカルビルド：

```bash
pnpm build        # ./out に静的エクスポート
pnpm start        # http://localhost:8080 でビルドをプレビュー
```

コントリビューションの手順は [`CONTRIBUTING.md`](./CONTRIBUTING.md) をご覧ください。

**🚢 メンテナー（Fork して独自デプロイしたい場合）**

リポジトリには GitHub Actions ワークフローが同梱されています。Fork 後：

1. **Settings → Pages** に移動
2. **Source** を **GitHub Actions** に設定
3. `main` にプッシュ —— `.github/workflows/deploy.yml` が自動でビルド・デプロイを実行

Fork したリポジトリは `https://<ユーザー名>.github.io/NetTools-Hub/` に公開されます。

### ✨ 機能

- 🔍 **スマート検索** —— 名前、作者、タグ、説明にマッチ（300ms デバウンス）
- 📊 **多次元ソート** —— ⭐ スター、名前、更新日
- 🗂 **21 カテゴリ** —— プロキシコア、GUI クライアント、GitHub 高速化、DNS、セキュリティ、監視など
- 🌐 **3 言語 UI** —— English / 中文 / 日本語
- 📱 **フルレスポンシブ** —— デスクトップ、タブレット、モバイル
- ⚡ **静的エクスポート** —— GitHub Pages CDN で超高速ロード
- 🔒 **SEO 完備** —— `robots.txt`、`sitemap.xml`、OpenGraph、Twitter Card
- ♿ **アクセシビリティ** —— ARIA ラベル、`focus-visible`、キーボードナビゲーション
- 🎯 **厳選品質** —— 直近 6 か月以内に更新のあるプロジェクトのみ

### 🛠 技術スタック

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** + カスタムテーマ
- **TypeScript 5.9**（strict モード）
- **pnpm 10**
- **GitHub Pages** + **GitHub Actions** CI/CD

### ➕ プロジェクトの追加 / 編集

すべてのコンテンツは単一の JSON ファイルに格納されています。CMS もマイグレーションスクリプトも不要です。[`data/projects.json`](./data/projects.json) を開き、以下のスキーマでエントリを追加してください：

```json
{
  "id": "unique-id",
  "name": "プロジェクト名",
  "description": "一言説明",
  "url": "https://github.com/作者/プロジェクト",
  "category": "カテゴリ-id",
  "tags": ["タグ1", "タグ2"],
  "language": "Go",
  "stars": 25000,
  "lastUpdate": "2026-05-30",
  "license": "MIT"
}
```

詳細は [`CONTRIBUTING.md`](./CONTRIBUTING.md) をご覧ください。

### 🤝 コントリビューション / 🔐 セキュリティ / 📄 ライセンス

- コントリビューション：[`CONTRIBUTING.md`](./CONTRIBUTING.md) ／ 行動規範：[`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)
- 脆弱性開示：[`SECURITY.md`](./SECURITY.md)（3 営業日以内に返信）
- ライセンス：[MIT](./LICENSE)

このプロジェクトが適切なツール発見の役に立ったら、⭐ でのサポートをお願いします。

</details>

---

<div align="center">

Made with ❤️ · **NetTools Hub** · 🛠️ One-stop navigation for the open-source network-tools ecosystem

</div>
