/**
 * Dashboardコンポーネント（ダッシュボード）
 * 
 * 管理者ページのダッシュボード画面です。
 * 統計情報やクイックアクセスを表示します。
 */

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllPerformances, getAllNews, getAllAdSlides } from '../data/adminData'
import styles from './Dashboard.module.css'

/**
 * Dashboardコンポーネント
 * 
 * @returns {JSX.Element} ダッシュボード画面
 */
function Dashboard() {
  const performances = useMemo(() => getAllPerformances(), [])
  const news = useMemo(() => getAllNews(), [])
  const adSlides = useMemo(() => getAllAdSlides(), [])

  const stats = useMemo(() => {
    const publishedPerformances = performances.filter(p => p.status === 'published').length
    const draftPerformances = performances.filter(p => p.status === 'draft').length
    const endedPerformances = performances.filter(p => p.status === 'ended').length
    const publishedNews = news.filter(n => n.isPublished).length
    const activeAds = adSlides.filter(a => a.isActive).length

    return {
      publishedPerformances,
      draftPerformances,
      endedPerformances,
      publishedNews,
      activeAds,
      totalPerformances: performances.length,
      totalNews: news.length,
      totalAds: adSlides.length
    }
  }, [performances, news, adSlides])

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>ダッシュボード</h1>
        <p className={styles.subtitle}>管理システムの概要</p>
      </div>

      {/* 統計カード */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎭</div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>公演数</div>
            <div className={styles.statValue}>{stats.totalPerformances}</div>
            <div className={styles.statDetail}>
              <span className={styles.statBadgeSuccess}>{stats.publishedPerformances} 公開中</span>
              <span className={styles.statBadgeWarning}>{stats.draftPerformances} 下書き</span>
              <span className={styles.statBadgeGray}>{stats.endedPerformances} 終了</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📢</div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>お知らせ数</div>
            <div className={styles.statValue}>{stats.totalNews}</div>
            <div className={styles.statDetail}>
              <span className={styles.statBadgeSuccess}>{stats.publishedNews} 公開中</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🖼️</div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>広告スライド数</div>
            <div className={styles.statValue}>{stats.totalAds}</div>
            <div className={styles.statDetail}>
              <span className={styles.statBadgeSuccess}>{stats.activeAds} 有効</span>
            </div>
          </div>
        </div>
      </div>

      {/* クイックアクション */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>クイックアクション</h2>
        <div className={styles.actionGrid}>
          <Link to="/admin/performances" className={styles.actionCard}>
            <div className={styles.actionIcon}>➕</div>
            <div className={styles.actionLabel}>新規公演を作成</div>
          </Link>
          <Link to="/admin/news" className={styles.actionCard}>
            <div className={styles.actionIcon}>➕</div>
            <div className={styles.actionLabel}>お知らせを追加</div>
          </Link>
          <Link to="/admin/ads" className={styles.actionCard}>
            <div className={styles.actionIcon}>➕</div>
            <div className={styles.actionLabel}>広告を追加</div>
          </Link>
        </div>
      </div>

      {/* 最近の公演（公開中・下書き） */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>最近の公演</h2>
          <Link to="/admin/performances" className={styles.viewAllLink}>すべて見る →</Link>
        </div>
        <div className={styles.list}>
          {performances.slice(0, 5).map(perf => (
            <Link
              key={perf.id}
              to={`/admin/performances/${perf.id}`}
              className={styles.listItem}
            >
              <div className={styles.listItemContent}>
                <div className={styles.listItemTitle}>{perf.title}</div>
                <div className={styles.listItemMeta}>
                  <span className={styles.listItemType}>{perf.type}</span>
                  <span className={`${styles.listItemStatus} ${styles[`listItemStatus${perf.status.charAt(0).toUpperCase() + perf.status.slice(1)}`]}`}>
                    {perf.status === 'published' ? '公開中' :
                     perf.status === 'draft' ? '下書き' : '終了'}
                  </span>
                </div>
              </div>
              <div className={styles.listItemArrow}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

