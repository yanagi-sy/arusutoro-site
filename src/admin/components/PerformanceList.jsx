/**
 * PerformanceListコンポーネント（公演一覧）
 * 
 * 公演の一覧を表示し、新規作成や編集へのナビゲーションを提供します。
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllPerformances } from '../data/adminData'
import styles from './PerformanceList.module.css'

/**
 * PerformanceListコンポーネント
 * 
 * @returns {JSX.Element} 公演一覧画面
 */
function PerformanceList() {
  const [filter, setFilter] = useState('all') // 'all' | 'published' | 'draft' | 'ended'
  const [searchQuery, setSearchQuery] = useState('')

  const allPerformances = useMemo(() => getAllPerformances(), [])

  const filteredPerformances = useMemo(() => {
    let filtered = allPerformances

    // フィルター適用
    if (filter !== 'all') {
      filtered = filtered.filter(p => p.status === filter)
    }

    // 検索クエリ適用
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.venue.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allPerformances, filter, searchQuery])

  const getStatusLabel = (status) => {
    switch (status) {
      case 'published':
        return '公開中'
      case 'draft':
        return '下書き'
      case 'ended':
        return '終了'
      default:
        return status
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'published':
        return styles.statusPublished
      case 'draft':
        return styles.statusDraft
      case 'ended':
        return styles.statusEnded
      default:
        return ''
    }
  }

  return (
    <div className={styles.performanceList}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>公演管理</h1>
          <p className={styles.subtitle}>公演の一覧と管理</p>
        </div>
        <Link to="/admin/performances/new" className={styles.newButton}>
          ➕ 新規作成
        </Link>
      </div>

      {/* フィルターと検索 */}
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${filter === 'all' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('all')}
          >
            すべて ({allPerformances.length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'published' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('published')}
          >
            公開中 ({allPerformances.filter(p => p.status === 'published').length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'draft' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('draft')}
          >
            下書き ({allPerformances.filter(p => p.status === 'draft').length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'ended' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('ended')}
          >
            終了 ({allPerformances.filter(p => p.status === 'ended').length})
          </button>
        </div>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="タイトル、説明、会場で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* 公演一覧 */}
      <div className={styles.list}>
        {filteredPerformances.length === 0 ? (
          <div className={styles.empty}>
            {searchQuery ? '検索結果が見つかりませんでした' : '公演がありません'}
          </div>
        ) : (
          filteredPerformances.map(perf => (
            <Link
              key={perf.id}
              to={`/admin/performances/${perf.id}`}
              className={styles.item}
            >
              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>{perf.title}</h3>
                  <span className={`${styles.itemStatus} ${getStatusClass(perf.status)}`}>
                    {getStatusLabel(perf.status)}
                  </span>
                </div>
                <div className={styles.itemMeta}>
                  <span className={styles.itemType}>{perf.type}</span>
                  <span className={styles.itemDate}>
                    {perf.startDate} 〜 {perf.endDate}
                  </span>
                  {perf.venue && (
                    <span className={styles.itemVenue}>{perf.venue}</span>
                  )}
                </div>
                {perf.description && (
                  <p className={styles.itemDescription}>{perf.description}</p>
                )}
                <div className={styles.itemFooter}>
                  <span className={styles.itemReservable}>
                    {perf.isReservable ? '✅ 予約可' : '❌ 予約不可'}
                  </span>
                  <span className={styles.itemUpdated}>
                    更新: {new Date(perf.updatedAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>
              <div className={styles.itemArrow}>→</div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default PerformanceList

