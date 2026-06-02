<div align="center">

# 🛠️ NetTools Hub · NetTools ハブ

> **120以上の活発にメンテナンスされているオープンソースネットワークツールを一元的に集約したナビゲーションプラットフォーム。**
> プロキシ · VPN · Clash ファミリー · GitHub 高速化 · DNS · セキュリティ · 監視

[**🌐 ライブサイト**](https://badhope.github.io/NetTools-Hub/) · [**📖 ドキュメント**](./docs) · [**🐛 バグ報告**](../../issues/new?template=bug_report.yml) · [**✨ 機能要望**](../../issues/new?template=feature_request.yml) · [**🌍 翻訳に協力**](../../issues/new?template=translation.yml)

<!-- LANG -->
[**English**](README.md) · [**简体中文**](README.zh.md) · **日本語**

<!-- BADGES -->
[![Live Site](https://img.shields.io/badge/🌐_ライブサイト-blue?style=for-the-badge)](https://badhope.github.io/NetTools-Hub/)
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

## 🎯 これは何？

**NetTools Hub** は、活発にメンテナンスされているオープンソースのネットワークツールを発見・比較するための**静的ナビゲーションサイト**です。すべてのデータは単一の JSON ファイル（[`data/projects.json`](./data/projects.json)）にまとめられ、**GitHub Pages** に自動デプロイされます。**バックエンド、データベース、トラッキング、広告は一切ありません**。

| 💡 何か | ❌ 何ではないか |
|---|---|
| ネットワークツールの**厳選ディレクトリ** | VPN サービスやプロキシ提供元ではない |
| 検索・フィルター・並び替え可能な**検索可能カタログ** | 掲載ツールのホスティングプラットフォームではない |
| Next.js + React で構築された**静的サイト** | SaaS / 有料プロダクトではない |
| **MIT ライセンスの 100% フリー & オープンソース** | コンテンツスクレイパーではない（データは手作業で厳選） |
| **3 言語 UI**（英語 / 中文 / 日本語） | 単一言語・単一地域に限定されない |

---

## 🚀 クイックスタート

### 👤 ユーザー（ツールを探すだけの場合）

1. **オンラインサイトを開く** 👉 <https://badhope.github.io/NetTools-Hub/>
2. **ブラウズまたは検索** —— サイドバーからテーマグループ（例：*プロキシコア*、*高速化*、*デプロイと運用*）を選び、サブカテゴリに絞り込むか、検索バーにキーワードを入力（名前、作者、タグ、説明での検索に対応）
3. **カードをクリック** して該当 GitHub リポジトリへ移動し、公式ドキュメントを読む

サイトは完全レスポンシブ対応で、**デスクトップ / タブレット / モバイル** で動作します。右上の言語スイッチャーで **英語 / 中文 / 日本語** をいつでも切り替えられます。

### 🛠️ 開発者 / コントリビューター（実行・改変したい場合）

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

### 🚢 メンテナー（Fork して独自デプロイしたい場合）

リポジトリには GitHub Actions ワークフローが同梱されています。Fork 後：

1. **Settings → Pages** に移動
2. **Source** を **GitHub Actions** に設定
3. `main` にプッシュ —— `.github/workflows/deploy.yml` が自動でビルド・デプロイを実行

Fork したリポジトリは `https://<ユーザー名>.github.io/NetTools-Hub/` に公開されます。

---

## ✨ 機能

- 🔍 **スマート検索** —— 名前、作者、タグ、説明にマッチ（300 ms デバウンス）
- 📊 **多次元ソート** —— ⭐ スター、名前、更新日
- 🗂 **6 テーマグループ / 21 サブカテゴリ** —— プロキシコア、高速化、デプロイと運用、設定と DNS、ツールとテスト、セキュリティ他
- 🌐 **3 言語 UI** —— English / 中文 / 日本語（ランタイム切り替え可能）
- 📱 **フルレスポンシブ** —— デスクトップ、タブレット、モバイル（折りたたみ可能サイドバー、ハンバーガードロワー）
- ⚡ **静的エクスポート** —— GitHub Pages CDN で超高速ロード
- 🔒 **SEO 完備** —— `robots.txt`、`sitemap.xml`、OpenGraph、Twitter Card
- ♿ **アクセシビリティ** —— ARIA ラベル、`focus-visible`、キーボードナビゲーション
- 🎯 **厳選品質** —— 直近 6 か月以内に更新のあるプロジェクトのみ
- 🌓 **ダークテーマ** デフォルト、GitHub 風デザイントークン

---

## 📸 プレビュー

🌐 **ライブデモ**：<https://badhope.github.io/NetTools-Hub/>

サイトには 2 つの主要ビューがあります：

- **`/`** —— **ランディングページ** —— Hero、機能のハイライト、6 テーマグループカード、コールトゥアクション
- **`/explore`** —— **ブラウズと検索** —— 6 テーマグループのサイドバー（折りたたみ可能）、リアルタイム検索、ソートドロップダウン、プロジェクトグリッド

---

## 🗂 プロジェクト構成

```
NetTools-Hub/
├── .github/
│   ├── ISSUE_TEMPLATE/         # バグ報告、機能要望、翻訳リクエスト
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Pages 自動デプロイ
│   ├── CODEOWNERS
│   ├── FUNDING.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── data/
│   └── projects.json           # 124 プロジェクト × 21 カテゴリ（データの真実の源）
├── docs/                       # 追加ドキュメント
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # UI：サイドバー、カード、検索、ソート、言語スイッチャー…
│   ├── lib/                    # i18n テーブル、データアクセス、ユーティリティ
│   └── types/                  # TypeScript 型
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .npmrc                      # pnpm@10
├── .nvmrc                      # node 22
├── CHANGELOG.md                # 変更履歴
├── CODE_OF_CONDUCT.md          # コントリビュータ・コーヴェナント v2.1
├── CONTRIBUTING.md             # 完全なコントリビューションガイド
├── LICENSE                     # MIT
├── README.md                   # English（デフォルト）
├── README.zh.md                # 简体中文
├── README.ja.md                # あなたがここを見ています
├── SECURITY.md                 # 脆弱性開示ポリシー
├── eslint.config.mjs
├── next.config.ts              # output: "export"（静的）
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs          # Tailwind v4
└── tsconfig.json
```

---

## 🛠 技術スタック

| レイヤー | 選択 | 理由 |
|---|---|---|
| フレームワーク | **Next.js 16** (App Router) | 静的エクスポート、RSC、ファイルベースルーティング |
| UI | **React 19** | 最新安定版 |
| スタイリング | **Tailwind CSS v4** | `@import "tailwindcss"` + `@theme` トークン |
| 言語 | **TypeScript 5.9** | strict モード |
| パッケージマネージャー | **pnpm 10** | 高速、ディスク効率 |
| ホスティング | **GitHub Pages** | 無料、高速 CDN、ベンダーロックインなし |
| CI/CD | **GitHub Actions** | `actions/checkout@v4` + `pnpm/action-setup@v4` + `actions/deploy-pages@v4` |
| i18n | 手書きの 3 言語対応表 | JS バンドルオーバーヘッドゼロ、ランタイム切り替え |

---

## ➕ プロジェクトの追加 / 編集

すべてのコンテンツは単一の JSON ファイルに格納されています。CMS もマイグレーションスクリプトも不要です。

1. [`data/projects.json`](./data/projects.json) を開く
2. 以下のスキーマでエントリを追加（型定義は [`src/types/project.ts`](./src/types/project.ts)）：

   ```json
   {
     "id": "sing-box",
     "name": "sing-box",
     "description": "ユニバーサルプロキシプラットフォーム…",
     "url": "https://github.com/SagerNet/sing-box",
     "category": "proxy-core",
     "tags": ["proxy", "shadowsocks", "trojan"],
     "language": "Go",
     "stars": 25000,
     "lastUpdate": "2026-05-30",
     "license": "MIT"
   }
   ```

3. PR を作成。CI が次回 `main` へのプッシュ時にプレビューをデプロイします。

> ✅ 収録基準：直近 6 か月以内のアクティブコミット、OSI 認定ライセンス、実用的なユースケース。詳細は [`CONTRIBUTING.md`](./CONTRIBUTING.md) を参照。

---

## 📑 6 テーマグループ（21 サブカテゴリ）

| グループ | アイコン | サブカテゴリ |
|---|---|---|
| **プロキシコア** | 🔌 | プロキシコア · GUI クライアント · サブスクリプション管理 · プロトコルツール |
| **高速化** | 🚀 | GitHub 高速化 · ルータープラグイン · ミラー高速化 · トンネルツール |
| **デプロイと運用** | 🐳 | Docker デプロイ · コンテナオーケストレーション · サーバー管理 · ノードツール · 監視 |
| **設定と DNS** | ⚙️ | ルールコレクション · DNS ツール · 証明書ツール |
| **ツールとテスト** | 🧰 | ユーティリティ · ネットワークテスト · データ転送 |
| **セキュリティ他** | 🛡️ | セキュリティツール · プロジェクトコレクション |

---

## 🌍 国際化 (i18n)

サイト UI と本リポジトリのドキュメントは 3 言語で提供されています：

| 言語 | コード | UI 翻訳 | ドキュメント |
|---|---|---|---|
| 🇬🇧 English（デフォルト） | `en` | ✅ | [`README.md`](./README.md) |
| 🇨🇳 简体中文 | `zh` | ✅ | [`README.zh.md`](./README.zh.md) |
| 🇯🇵 日本語 | `ja` | ✅ | [`README.ja.md`](./README.ja.md) |

**新しい翻訳を追加** または **既存翻訳を改善** したい場合は、PR を作成してください。詳細は [`CONTRIBUTING.md` → "翻訳の追加・改善"](./CONTRIBUTING.md#-翻訳の追加--改善)。

---

## 🤝 コントリビューション

PR を歓迎します！[`CONTRIBUTING.md`](./CONTRIBUTING.md) を参照：

- ローカル開発セットアップ & スクリプト
- データスキーマとプロジェクトの追加方法
- コードスタイル、Lint、**Conventional Commits**（`feat:`、`fix:`、`docs:`、…）
- PR レビュープロセス
- 翻訳の追加・改善方法

参加することで、[行動規範](./CODE_OF_CONDUCT.md) に同意したものとみなされます。

## 🔐 セキュリティ

脆弱性を発見しましたか？**公開 Issue で開示しないでください。** [`SECURITY.md`](./SECURITY.md) の非公開開示プロセスに従ってください。**3 営業日以内** に対応します。

## 💬 サポート & コミュニティ

ヘルプや質問が必要ですか？推奨チャネルは [`SUPPORT.md`](./.github/SUPPORT.md) を参照。

## 📄 ライセンス

[MIT ライセンス](./LICENSE) の下で配布されています。

---

## ⭐ スター履歴

このプロジェクトが適切なツール発見の役に立ったら、⭐ でのサポートをお願いします。更多人への周知につながります。

[![Star History Chart](https://api.star-history.com/svg?repos=badhope/NetTools-Hub&type=Date)](https://star-history.com/#badhope/NetTools-Hub&Date)

---

<div align="center">

Made with ❤️ · **NetTools Hub** · 🛠️ オープンソースネットワークツールエコシステムの一元的ナビゲーション · [**English**](README.md) · [**简体中文**](README.zh.md) · **日本語**

</div>
