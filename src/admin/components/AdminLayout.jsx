/**
 * AdminLayoutコンポーネント（管理者ページのレイアウト）
 * 
 * 管理者ページ全体のレイアウトを提供します。
 * サイドバーとメインコンテンツエリアで構成されます。
 */

import { Link, useLocation } from 'react-router-dom'
import styles from './AdminLayout.module.css'

/**
 * AdminLayoutコンポーネント
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子要素（メインコンテンツ）
 * @returns {JSX.Element} 管理者ページのレイアウト
 */
function AdminLayout({ children }) {
  const location = useLocation()

  const navItems = [
    { path: '/admin', label: 'ダッシュボード', icon: '📊' },
    { path: '/admin/performances', label: '公演管理', icon: '🎭' },
    { path: '/admin/reservations', label: '予約管理', icon: '📋' },
    { path: '/admin/news', label: 'お知らせ管理', icon: '📢' },
    { path: '/admin/ads', label: '広告管理', icon: '🖼️' }
  ]

  return (
    <div className={styles.adminLayout}>
      {/* サイドバー */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>管理者ページ</h1>
          <p className={styles.sidebarSubtitle}>管理システム</p>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin' && location.pathname.startsWith(item.path))
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default AdminLayout

