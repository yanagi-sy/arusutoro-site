/**
 * AdminAppコンポーネント（管理者ページのメインアプリケーション）
 * 
 * 管理者ページ専用のアプリケーションです。
 * 一般ページとは完全に独立したルーティングとレイアウトを持ちます。
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import Dashboard from './components/Dashboard'
import PerformanceList from './components/PerformanceList'
import PerformanceEdit from './components/PerformanceEdit'
import ReservationsPage from './components/ReservationsPage'
import NewsEdit from './components/NewsEdit'
import NewsForm from './components/NewsForm'
import AdSlideEdit from './components/AdSlideEdit'
import AdSlideForm from './components/AdSlideForm'
import './AdminApp.css'

/**
 * AdminAppコンポーネント
 * 
 * 管理者ページ全体のルーティングを管理します。
 * 
 * @returns {JSX.Element} 管理者ページアプリケーション
 */
function AdminApp() {
  return (
    <AdminLayout>
      <Routes>
        {/* ダッシュボード */}
        <Route path="/" element={<Dashboard />} />
        
        {/* 公演管理 */}
        <Route path="/performances" element={<PerformanceList />} />
        {/* "new" も含め、ID付きのパスはすべて PerformanceEdit で処理 */}
        <Route path="/performances/:id" element={<PerformanceEdit />} />
        
        {/* 予約管理 */}
        <Route path="/reservations" element={<ReservationsPage />} />
        
        {/* お知らせ管理 */}
        <Route path="/news" element={<NewsEdit />} />
        {/* "new" も含め、ID付きのパスはすべて NewsForm で処理 */}
        <Route path="/news/:id" element={<NewsForm />} />
        
        {/* 広告管理 */}
        <Route path="/ads" element={<AdSlideEdit />} />
        {/* "new" も含め、ID付きのパスはすべて AdSlideForm で処理 */}
        <Route path="/ads/:id" element={<AdSlideForm />} />
        
        {/* その他のパスはダッシュボードにリダイレクト */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminApp

