# 劇団 或素翔鷲 公式サイト

劇団 或素翔鷲の公式ウェブサイトです。一般向けの公開ページと、管理者向けの管理画面を備えた React アプリケーションです。

---

## ディレクトリ構成

```
gekidan-site/
├── public/                 # 静的ファイル
│   └── vite.svg
├── src/
│   ├── admin/              # 管理者ページ（一般ページとは完全に独立）
│   │   ├── AdminApp.jsx     # 管理者アプリのエントリ・ルーティング
│   │   ├── AdminApp.css
│   │   ├── data/
│   │   │   └── adminData.js # 管理者用ダミーデータ（公演・お知らせ・広告）
│   │   └── components/
│   │       ├── AdminLayout.jsx      # サイドバーレイアウト
│   │       ├── Dashboard.jsx        # ダッシュボード
│   │       ├── PerformanceList.jsx  # 公演一覧
│   │       ├── PerformanceEdit.jsx  # 公演編集
│   │       ├── NewsEdit.jsx          # お知らせ管理
│   │       └── AdSlideEdit.jsx       # 広告スライド管理
│   │
│   ├── assets/              # 画像・静的アセット
│   │   └── images/
│   ├── components/          # 一般ページ用共通コンポーネント
│   │   ├── Navigation/      # ヘッダーナビゲーション
│   │   ├── Footer/          # フッター
│   │   ├── HeroSection/     # トップヒーロー
│   │   ├── NewsEventsSection/
│   │   ├── CurrentActivitiesSection/
│   │   ├── BunkouSection/
│   │   ├── NotFoundMessage/  # 見つからない場合のエラー表示（共通）
│   │   └── PublicLayout.jsx # 一般ページ用レイアウト
│   │
│   ├── data/                # 生データ（ダミー）。直接参照せず services 経由で利用
│   │   ├── activities.js    # 公演・イベント
│   │   └── news.js          # お知らせ
│   │
│   ├── services/            # データ取得の窓口（Firebase 差し替え時はここを修正）
│   │   ├── activityService.js  # getActivityById, getAllActivities
│   │   └── newsService.js       # getAllNews
│   │
│   ├── hooks/               # データ・状態取得の集約
│   │   ├── useActivity.js   # useActivity(activityId) → { activity, notFound }
│   │   ├── useActivities.js # useActivities(options?) → 活動一覧
│   │   └── useNews.js       # useNews() → お知らせ一覧
│   │
│   ├── utils/               # 純粋関数（フォーマット・計算・ステータス表示）
│   │   ├── format.js        # formatDate など
│   │   ├── activityUtils.js # getRemainingSeats, isSoldOut
│   │   └── activityStatus.js # getStatusBadge
│   │
│   ├── lib/
│   │   └── firebase.js      # Firebase 初期化（将来用・未接続）
│   │
│   ├── pages/               # 一般ページ・旧管理者ページ
│   │   ├── AboutPage.jsx    # 劇団紹介
│   │   ├── BunkouPage.jsx   # 文抗時代
│   │   ├── ContactPage.jsx   # お問い合わせ
│   │   ├── ActivitiesPage.jsx
│   │   ├── ActivityDetailPage.jsx
│   │   ├── ReservePage.jsx
│   │   ├── ReserveConfirmPage.jsx
│   │   ├── ReserveCompletePage.jsx
│   │   └── AdminPage.jsx    # 旧管理者ページ（サービス層経由で公演データ取得。/admin は AdminApp に委譲）
│   │
│   ├── App.jsx               # アプリ全体のルーティング
│   ├── App.css
│   ├── main.jsx              # エントリポイント
│   └── index.css             # グローバルスタイル
│
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 起動方法

### 必要な環境

- Node.js（推奨: v18 以上）
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバー

```bash
npm run dev
```

起動後、ブラウザで以下にアクセスします。

- **一般サイト**: `http://localhost:5173/`
- **管理者ページ**: `http://localhost:5173/admin`

### ビルド（本番用）

```bash
npm run build
```

`dist/` にビルド成果物が出力されます。

### ビルドのプレビュー

```bash
npm run preview
```

本番ビルドをローカルで確認できます。

### リント

```bash
npm run lint
```

---

## 機能解説

### 一般ページ（公開サイト）

| パス | 機能 |
|------|------|
| `/` | トップページ（ヒーロー、お知らせ、公演一覧、文抗時代） |
| `/about` | 劇団紹介 |
| `/activities` | 公演・イベント一覧 |
| `/activities/:activityId` | 公演詳細 |
| `/reserve/:activityId` | 予約ページ |
| `/reserve/:activityId/confirm` | 予約確認 |
| `/reserve/:activityId/complete` | 予約完了 |
| `/bunkou` | 文抗時代 |
| `/contact` | お問い合わせ |

- 全般で **Navigation** と **Footer** を共通表示。
- 公演・お知らせは **services** 経由で取得（実体は `src/data/` のダミーデータ）。Firebase は未接続。

### 管理者ページ（/admin/*）

一般ページとは **別レイアウト**（サイドバー＋メイン）で、`src/admin/` 配下で完結しています。

| パス | 機能 |
|------|------|
| `/admin` | ダッシュボード（統計・クイックアクション・最近の公演） |
| `/admin/performances` | 公演一覧（フィルター・検索） |
| `/admin/performances/new` | 新規公演作成 |
| `/admin/performances/:id` | 公演編集（公開/非公開・終了・予約可否・開催回） |
| `/admin/news` | お知らせ一覧・公開/非公開切り替え |
| `/admin/ads` | 広告スライド一覧・順序変更・有効/無効 |

- データは **Firebase 未使用**。`src/admin/data/adminData.js` のダミーデータで動作。
- 保存・削除などの操作は UI のみで、後から Firestore に差し替える前提の構成です。
- 認証は未実装。後から認証ガードを付ける想定です。

---

## 責務分離・アーキテクチャ

データ取得と表示ロジックを分離し、Firebase 差し替えやテストをしやすくしています。

| 層 | 役割 | 主なファイル |
|----|------|--------------|
| **data/** | 生データ（ダミー配列）。**直接参照しない**。 | `activities.js`, `news.js` |
| **services/** | データ取得の窓口。Firebase に差し替える場合はここだけ修正。 | `activityService.js`, `newsService.js` |
| **hooks/** | 「ID で 1 件」「一覧」などの取得・状態をコンポーネントに提供。 | `useActivity`, `useActivities`, `useNews` |
| **utils/** | 日付フォーマット・残席計算・ステータス表示など純粋関数。 | `format.js`, `activityUtils.js`, `activityStatus.js` |
| **components/pages** | ルーティング・フォーム・表示のつなぎ。データは hooks / utils 経由で利用。 | 各 Page, Section, NotFoundMessage など |

- **一般ページ**：`useActivity` / `useActivities` / `useNews` と `utils` を利用。
- **AdminPage**（`src/pages/AdminPage.jsx`）：公演一覧取得に **activityService** の `getAllActivities` を利用（`data/activities` の直接参照は廃止）。

---

## 技術選定

| 項目 | 選定 |
|------|------|
| **言語** | JavaScript（ES Modules） |
| **フレームワーク** | React 19 |
| **ビルド** | Vite 7 |
| **ルーティング** | react-router-dom v7 |
| **スタイル** | CSS（通常 CSS + CSS Modules） |
| **バックエンド / データ** | 未接続。ダミーデータ（JS 配列）を **services** 経由で利用。将来 Firebase（Auth / Firestore）は services 層に差し替え想定。 |

### 選定理由（要約）

- **React + Vite**: 開発体験とビルド速度を優先。
- **react-router-dom**: シンプルな SPA ルーティングに十分。
- **CSS / CSS Modules**: 型なしで進める方針に合わせ、シンプルにスタイルを分離。
- **Firebase**: 将来的な認証・DB 用に設定ファイル（`src/lib/firebase.js`）のみ用意。現状は未使用。
- **管理者を `src/admin/` に分離**: 一般サイトとレイアウト・データを分け、保守と後の認証追加をしやすくするため。
- **services / hooks / utils**: 責務分離と Firebase 差し替えのしやすさのため。AdminPage 含めデータ取得はサービス層経由に統一。

---

## 今後の拡張

- Firebase Authentication による管理者認証
- Firestore への公演・お知らせ・広告データの移行
- 管理者画面からの実データの保存・更新・削除

---

## ライセンス

private / 劇団 或素翔鷲 用プロジェクトです。
