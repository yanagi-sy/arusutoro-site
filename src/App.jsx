/**
 * Appコンポーネント（メインコンポーネント）
 * 
 * このファイルは、アプリケーション全体の構造とルーティングを管理します。
 * 
 * 【主な役割】
 * 1. ページルーティングの設定（react-router-domを使用）
 * 2. 全ページ共通のコンポーネント（Navigation、Footer）の配置
 * 3. 各ページコンポーネントの読み込みと表示
 * 
 * 【ページ構成】
 * - / : トップページ（HomePage）
 * - /about : 劇団紹介ページ
 * - /activities : 活動一覧ページ
 * - /activities/:activityId : 公演詳細ページ
 * - /reserve/:activityId : 予約ページ
 * - /reserve/:activityId/confirm : 予約確認ページ
 * - /reserve/:activityId/complete : 予約完了ページ
 * - /cancel : 予約キャンセルページ
 * - /bunkou : 文抗時代ページ
 * - /contact : お問い合わせページ
 */

// react-router-domからルーティング機能をインポート
// BrowserRouter: ブラウザの履歴APIを使用してルーティングを管理
// Routes: 複数のルートを定義するコンテナ
// Route: 個別のルート（URLパスと表示するコンポーネントを紐付け）
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// 一般ページ用のレイアウトコンポーネント
import PublicLayout from './components/PublicLayout'

// トップページ用のセクションコンポーネントをインポート
import HeroSection from './components/HeroSection' // ヒーローセクション（背景画像と劇団名）
import NewsEventsSection from './components/NewsEventsSection' // お知らせセクション
import CurrentActivitiesSection from './components/CurrentActivitiesSection' // 現在の公演・イベントセクション
import BunkouSection from './components/BunkouSection' // 文抗時代セクション（トップページ下部）

// 各ページコンポーネントをインポート
import AboutPage from './pages/AboutPage' // 劇団紹介ページ
import BunkouPage from './pages/BunkouPage' // 文抗時代ページ
import ContactPage from './pages/ContactPage' // お問い合わせページ
import ActivitiesPage from './pages/ActivitiesPage' // 活動一覧ページ
import ActivityDetailPage from './pages/ActivityDetailPage' // 公演詳細ページ
import ReservePage from './pages/ReservePage' // 予約ページ
import ReserveConfirmPage from './pages/ReserveConfirmPage' // 予約確認ページ
import ReserveCompletePage from './pages/ReserveCompletePage' // 予約完了ページ
import CancelPage from './pages/CancelPage' // キャンセルページ

// 管理者ページアプリケーション（一般ページとは完全に独立）
import AdminApp from './admin/AdminApp'

// Appコンポーネント用のスタイルを読み込み
import './App.css'

/**
 * HomePageコンポーネント（トップページ）
 * 
 * トップページに表示するセクションをまとめたコンポーネントです。
 * 複数のセクションを縦に並べて表示します。
 * 
 * @returns {JSX.Element} トップページのコンテンツ
 */
function HomePage() {
  return (
    <>
      {/* HeroSection: 背景画像と縦書きの劇団名を表示するヒーローセクション */}
      <HeroSection />
      
      {/* NewsEventsSection: お知らせを掲示板形式（シンプルなテキスト）で表示するセクション */}
      <NewsEventsSection />
      
      {/* CurrentActivitiesSection: 現在の公演・イベントを横自動スクロール広告形式で表示するセクション（最重要） */}
      <CurrentActivitiesSection />
      
      {/* BunkouSection: 文抗時代紹介セクション（フッター直前） */}
      <BunkouSection />
    </>
  )
}

/**
 * Appコンポーネント（メインコンポーネント）
 * 
 * アプリケーション全体の構造を定義します。
 * Routerでページ遷移を管理し、各ページに共通のNavigationとFooterを配置します。
 * 管理者ページ（/admin/*）はAdminAppコンポーネントに委譲され、一般ページとは完全に独立しています。
 * 
 * @returns {JSX.Element} アプリケーション全体の構造
 */
function App() {
  return (
    // Router: ブラウザのURLに基づいてページを切り替える
    <Router>
      {/* Routes: 複数のルート（ページ）を定義 */}
      <Routes>
        {/* 管理者ページ: URLが "/admin/*" のときにAdminAppコンポーネントを表示（一般ページとは独立） */}
        <Route path="/admin/*" element={<AdminApp />} />
        
        {/* 一般ページ: NavigationとFooterを含むレイアウトで各ページをラップ */}
        {/* トップページ: URLが "/" のときにHomePageコンポーネントを表示 */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        
        {/* 劇団紹介ページ: URLが "/about" のときにAboutPageコンポーネントを表示 */}
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        
        {/* 文抗時代ページ: URLが "/bunkou" のときにBunkouPageコンポーネントを表示 */}
        <Route path="/bunkou" element={<PublicLayout><BunkouPage /></PublicLayout>} />
        
        {/* お問い合わせページ: URLが "/contact" のときにContactPageコンポーネントを表示 */}
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        
        {/* 活動一覧ページ: URLが "/activities" のときにActivitiesPageコンポーネントを表示 */}
        <Route path="/activities" element={<PublicLayout><ActivitiesPage /></PublicLayout>} />
        
        {/* 公演詳細ページ: URLが "/activities/:activityId" のときにActivityDetailPageコンポーネントを表示 */}
        <Route path="/activities/:activityId" element={<PublicLayout><ActivityDetailPage /></PublicLayout>} />
        
        {/* 予約ページ: URLが "/reserve/:activityId" のときにReservePageコンポーネントを表示 */}
        <Route path="/reserve/:activityId" element={<PublicLayout><ReservePage /></PublicLayout>} />
        
        {/* 予約確認ページ: URLが "/reserve/:activityId/confirm" のときにReserveConfirmPageコンポーネントを表示 */}
        <Route path="/reserve/:activityId/confirm" element={<PublicLayout><ReserveConfirmPage /></PublicLayout>} />
        
        {/* 予約完了ページ: URLが "/reserve/:activityId/complete" のときにReserveCompletePageコンポーネントを表示 */}
        <Route path="/reserve/:activityId/complete" element={<PublicLayout><ReserveCompletePage /></PublicLayout>} />
        {/* キャンセルページ: URLが "/cancel" のときにCancelPageコンポーネントを表示 */}
        <Route path="/cancel" element={<PublicLayout><CancelPage /></PublicLayout>} />
      </Routes>
    </Router>
  )
}

// Appコンポーネントを他のファイルで使用できるようにエクスポート
export default App
