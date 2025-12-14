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
 * - /bunkou : 文抗時代ページ
 * - /contact : お問い合わせページ
 */

// react-router-domからルーティング機能をインポート
// BrowserRouter: ブラウザの履歴APIを使用してルーティングを管理
// Routes: 複数のルートを定義するコンテナ
// Route: 個別のルート（URLパスと表示するコンポーネントを紐付け）
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// 全ページ共通のコンポーネントをインポート
import Navigation from './components/Navigation' // ヘッダーナビゲーション
import Footer from './components/Footer' // フッター

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
 * 
 * @returns {JSX.Element} アプリケーション全体の構造
 */
function App() {
  return (
    // Router: ブラウザのURLに基づいてページを切り替える
    <Router>
      {/* app-background: 全ページ共通の背景画像を設定するラッパー */}
      <div className="app-background">
        {/* Navigation: 全ページ共通のヘッダーナビゲーション（スティッキーヘッダー） */}
        <Navigation />
        
        {/* Routes: 複数のルート（ページ）を定義 */}
        <Routes>
          {/* トップページ: URLが "/" のときにHomePageコンポーネントを表示 */}
          <Route path="/" element={<HomePage />} />
          
          {/* 劇団紹介ページ: URLが "/about" のときにAboutPageコンポーネントを表示 */}
          <Route path="/about" element={<AboutPage />} />
          
          {/* 文抗時代ページ: URLが "/bunkou" のときにBunkouPageコンポーネントを表示 */}
          <Route path="/bunkou" element={<BunkouPage />} />
          
          {/* お問い合わせページ: URLが "/contact" のときにContactPageコンポーネントを表示 */}
          <Route path="/contact" element={<ContactPage />} />
          
          {/* 活動一覧ページ: URLが "/activities" のときにActivitiesPageコンポーネントを表示 */}
          <Route path="/activities" element={<ActivitiesPage />} />
        </Routes>
        
        {/* Footer: 全ページ共通のフッター */}
        <Footer />
      </div>
    </Router>
  )
}

// Appコンポーネントを他のファイルで使用できるようにエクスポート
export default App
