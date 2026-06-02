<div align="center">

# 🛠️ NetTools Hub · NetTools 集线器

> **一站式导航平台，收录 120+ 个活跃维护的开源网络工具。**
> 代理 · VPN · Clash 家族 · GitHub 加速 · DNS · 安全 · 监控

[**🌐 在线访问**](https://badhope.github.io/NetTools-Hub/) · [**📖 文档**](./docs) · [**🐛 反馈 Bug**](../../issues/new?template=bug_report.yml) · [**✨ 功能建议**](../../issues/new?template=feature_request.yml) · [**🌍 协助翻译**](../../issues/new?template=translation.yml)

<!-- LANG -->
[**English**](README.md) · **简体中文** · [**日本語**](README.ja.md)

<!-- BADGES -->
[![Live Site](https://img.shields.io/badge/🌐_在线站点-blue?style=for-the-badge)](https://badhope.github.io/NetTools-Hub/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/badhope/NetTools-Hub/deploy.yml?branch=main&label=Deploy&style=flat-square)](https://github.com/badhope/NetTools-Hub/actions/workflows/deploy.yml)
[![Pages Status](https://img.shields.io/github/deployments/badhope/NetTools-Hub/github-pages?style=flat-square&label=Pages)](https://github.com/badhope/NetTools-Hub/deployments)
[![MIT License](https://img.shields.io/github/license/badhope/NetTools-Hub?style=flat-square)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/badhope/NetTools-Hub?style=social)](https://github.com/badhope/NetTools-Hub/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/badhope/NetTools-Hub?style=social)](https://github.com/badhope/NetTools-Hub/network/members)
[![GitHub issues](https://img.shields.io/github/issues/badhope/NetTools-Hub?style=flat-square)](https://github.com/badhope/NetTools-Hub/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/badhope/NetTools-Hub?style=flat-square)](https://github.com/badhope/NetTools-Hub/pulls)
[![Last commit](https://img.shields.io/github/last-commit/badhope/NetTools-Hub?style=flat-square)](https://github.com/badhope/NetTools-Hub/commits/main)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222?logo=github&style=flat-square)](https://github.com/badhope/NetTools-Hub/deployments)
[![Top language](https://img.shields.io/github/languages/top/badhope/NetTools-Hub?style=flat-square)](https://github.com/badhope/NetTools-Hub/search?l=typescript)

</div>

---

## 🎯 这是什么？

**NetTools Hub** 是一个**静态导航网站**，帮助你发现和对比活跃维护的开源网络工具。所有数据集中存放在一个 JSON 文件（[`data/projects.json`](./data/projects.json)），并通过 **GitHub Pages** 自动部署 —— **无后端、无数据库、无追踪、无广告**。

| 💡 它是什么 | ❌ 它不是什么 |
|---|---|
| 精心策展的**网络工具目录** | 不是 VPN 服务商或代理提供方 |
| 可**搜索**的目录（带筛选/排序） | 不是所列工具的托管平台 |
| Next.js + React 构建的**静态站点** | 不是 SaaS / 付费产品 |
| **MIT 协议 100% 免费开源** | 不是内容抓取站（数据均为人工策展） |
| **三语界面**（英文 / 中文 / 日文） | 不局限于单一语言或地区 |

---

## 🚀 快速开始

### 👤 普通用户（只想找工具）

1. **打开在线站点** 👉 <https://badhope.github.io/NetTools-Hub/>
2. **浏览或搜索** —— 在侧边栏选择主题分组（如 *代理核心*、*网络加速*、*部署与运维*），再下钻到子分类；或在搜索框输入关键词（支持按名称、作者、标签、描述搜索）。
3. **点击卡片**跳转到对应 GitHub 仓库，阅读官方文档。

站点完全响应式，**桌面 / 平板 / 手机** 都能用。右上角语言切换器随时切换 **英文 / 中文 / 日文**。

### 🛠️ 开发者 / 贡献者（想运行或修改）

```bash
git clone https://github.com/badhope/NetTools-Hub.git
cd NetTools-Hub
pnpm install --frozen-lockfile   # 需要 Node 22+ 和 pnpm 10+
pnpm dev                          # http://localhost:8080
```

本地构建：

```bash
pnpm build        # 输出到 ./out（静态导出）
pnpm start        # 本地预览 http://localhost:8080
```

贡献流程请阅读 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

### 🚢 维护者（想 Fork 并部署自己的版本）

仓库自带 GitHub Actions 工作流，Fork 后：

1. 进入 **Settings → Pages**
2. **Source** 选择 **GitHub Actions**
3. 推送到 `main` —— `.github/workflows/deploy.yml` 自动构建并部署

你的 Fork 将部署到 `https://<用户名>.github.io/NetTools-Hub/`。

---

## ✨ 特性

- 🔍 **智能搜索** —— 按名称、作者、标签、描述匹配（防抖 300 ms）
- 📊 **多维排序** —— 按 ⭐ 星数、名称、更新时间
- 🗂 **6 大主题分组 / 21 个子分类** —— 代理核心、网络加速、部署与运维、配置与解析、工具与测试、安全与汇总
- 🌐 **三语 UI** —— English / 中文 / 日本語（可运行时切换）
- 📱 **完全响应式** —— 桌面、平板、手机（可折叠侧边栏、Hamburger 抽屉）
- ⚡ **静态导出** —— GitHub Pages CDN 极速加载
- 🔒 **SEO 完善** —— `robots.txt`、`sitemap.xml`、OpenGraph、Twitter Card
- ♿ **无障碍** —— ARIA 标签、`focus-visible`、键盘导航
- 🎯 **策展质量** —— 仅收录近 6 个月有更新的项目
- 🌓 **深色主题**默认开启，GitHub 风格设计令牌

---

## 📸 预览

🌐 **在线演示**：<https://badhope.github.io/NetTools-Hub/>

站点有两个主要视图：

- **`/`** —— **首页** —— Hero、特性亮点、6 大主题分组卡片、行动召唤
- **`/explore`** —— **浏览与搜索** —— 6 主题分组侧边栏（可折叠）、实时搜索、排序下拉、项目网格

---

## 🗂 项目结构

```
NetTools-Hub/
├── .github/
│   ├── ISSUE_TEMPLATE/         # Bug 报告、功能请求、翻译请求
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Pages 自动部署
│   ├── CODEOWNERS
│   ├── FUNDING.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── data/
│   └── projects.json           # 124 个项目 × 21 个分类（数据源）
├── docs/                       # 补充文档
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # UI：侧边栏、卡片、搜索、排序、语言切换器…
│   ├── lib/                    # i18n 表、数据访问、工具
│   └── types/                  # TypeScript 类型
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .npmrc                      # pnpm@10
├── .nvmrc                      # node 22
├── CHANGELOG.md                # 变更记录
├── CODE_OF_CONDUCT.md          # 贡献者公约 v2.1
├── CONTRIBUTING.md             # 完整贡献指南
├── LICENSE                     # MIT
├── README.md                   # 英文（默认）
├── README.zh.md                # 你正在看这个
├── README.ja.md                # 日本語
├── SECURITY.md                 # 漏洞披露策略
├── eslint.config.mjs
├── next.config.ts              # output: "export"（静态）
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs          # Tailwind v4
└── tsconfig.json
```

---

## 🛠 技术栈

| 层级 | 选型 | 理由 |
|---|---|---|
| 框架 | **Next.js 16** (App Router) | 静态导出、RSC、文件路由 |
| UI | **React 19** | 最新稳定版 |
| 样式 | **Tailwind CSS v4** | `@import "tailwindcss"` + `@theme` 令牌 |
| 语言 | **TypeScript 5.9** | strict 模式 |
| 包管理 | **pnpm 10** | 快速、节省磁盘 |
| 托管 | **GitHub Pages** | 免费、CDN 快速、无供应商锁定 |
| CI/CD | **GitHub Actions** | `actions/checkout@v4` + `pnpm/action-setup@v4` + `actions/deploy-pages@v4` |
| i18n | 手写三语对照表 | 零 JS bundle 体积、运行时切换 |

---

## ➕ 添加 / 编辑项目

所有内容都在一个 JSON 文件里 —— 无 CMS、无迁移脚本。

1. 打开 [`data/projects.json`](./data/projects.json)
2. 按以下结构添加条目（类型定义见 [`src/types/project.ts`](./src/types/project.ts)）：

   ```json
   {
     "id": "sing-box",
     "name": "sing-box",
     "description": "通用代理平台…",
     "url": "https://github.com/SagerNet/sing-box",
     "category": "proxy-core",
     "tags": ["proxy", "shadowsocks", "trojan"],
     "language": "Go",
     "stars": 25000,
     "lastUpdate": "2026-05-30",
     "license": "MIT"
   }
   ```

3. 提交 PR。CI 会在下次 push 到 `main` 时部署预览。

> ✅ 收录标准：近 6 个月有活跃提交、OSI 认可的开源协议、真实使用场景。详见 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

---

## 📑 6 大主题分组（21 个子分类）

| 分组 | 图标 | 子分类 |
|---|---|---|
| **代理核心** | 🔌 | 代理核心 · GUI 客户端 · 订阅管理 · 协议工具 |
| **网络加速** | 🚀 | GitHub 加速 · 路由器插件 · 镜像加速 · 隧道工具 |
| **部署与运维** | 🐳 | Docker 部署 · 容器编排 · 服务器管理 · 节点工具 · 监控 |
| **配置与解析** | ⚙️ | 规则合集 · DNS 工具 · 证书工具 |
| **工具与测试** | 🧰 | 实用工具 · 网络测试 · 数据传输 |
| **安全与汇总** | 🛡️ | 安全工具 · 项目合集 |

---

## 🌍 国际化 (i18n)

站点 UI 与本仓库文档提供三种语言：

| 语言 | 代码 | UI 翻译 | 文档 |
|---|---|---|---|
| 🇬🇧 English（默认） | `en` | ✅ | [`README.md`](./README.md) |
| 🇨🇳 简体中文 | `zh` | ✅ | [`README.zh.md`](./README.zh.md) |
| 🇯🇵 日本語 | `ja` | ✅ | [`README.ja.md`](./README.ja.md) |

想**新增一种语言**或**改进现有翻译**，欢迎提交 PR —— 详见 [`CONTRIBUTING.md` → "添加或改进翻译"](./CONTRIBUTING.md#-添加或改进翻译)。

---

## 🤝 贡献

欢迎 PR！详见贡献指南：

- 本地开发环境与脚本
- 数据 schema 与如何添加项目
- 代码风格、Lint、**Conventional Commits**（`feat:`、`fix:`、`docs:`、…）
- PR 审核流程
- 如何添加或改进翻译

**贡献指南：** [🇬🇧 English](CONTRIBUTING.md) · **🇨🇳 简体中文** · [🇯🇵 日本語](CONTRIBUTING.ja.md)

参与即视为同意遵守 [行为准则](./CODE_OF_CONDUCT.md)。

## 🔐 安全

发现漏洞？**请勿在公开 Issue 中披露**。按 [`SECURITY.md`](./SECURITY.md) 私下披露，我们承诺在 **3 个工作日内**响应。

## 💬 支持与社区

需要帮助或有疑问？查看 [`SUPPORT.md`](./.github/SUPPORT.md) 了解推荐渠道。

## 📄 许可证

本项目基于 [MIT 许可证](./LICENSE) 发布。

---

## ⭐ Star 历史

如果这个项目帮到了你找到合适的工具，欢迎 Star ⭐，让更多人看到。

[![Star History Chart](https://api.star-history.com/svg?repos=badhope/NetTools-Hub&type=Date)](https://star-history.com/#badhope/NetTools-Hub&Date)

---

<div align="center">

Made with ❤️ · **NetTools Hub** · 🛠️ 开源网络工具生态的一站式导航 · [**English**](README.md) · **简体中文** · [**日本語**](README.ja.md)

</div>
