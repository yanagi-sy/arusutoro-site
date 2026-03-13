/**
 * PublicLayoutコンポーネント（一般ページのレイアウト）
 * 
 * 一般ページ（管理者ページ以外）に共通のNavigationとFooterを表示します。
 */

import Navigation from './Navigation'
import Footer from './Footer'

/**
 * PublicLayoutコンポーネント
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子要素（ページコンテンツ）
 * @returns {JSX.Element} 一般ページのレイアウト
 */
function PublicLayout({ children }) {
  return (
    <div className="app-background">
      {/* Navigation: 全ページ共通のヘッダーナビゲーション（スティッキーヘッダー） */}
      <Navigation />
      
      {/* ページコンテンツ */}
      {children}
      
      {/* Footer: 全ページ共通のフッター */}
      <Footer />
    </div>
  )
}

export default PublicLayout

