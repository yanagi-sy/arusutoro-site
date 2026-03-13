/**
 * NewsEditコンポーネント（お知らせ管理）
 * 
 * お知らせの一覧表示と編集を行うコンポーネントです。
 */

import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAllNews } from '../data/adminData'
import styles from './NewsEdit.module.css'

/**
 * NewsEditコンポーネント
 * 
 * @returns {JSX.Element} お知らせ管理画面
 */
function NewsEdit() {
  const navigate = useNavigate()
  const allNews = useMemo(() => getAllNews(), [])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all') // 'all' | 'published' | 'draft'

  const filteredNews = useMemo(() => {
    let filtered = allNews

    // フィルター適用
    if (filter === 'published') {
      filtered = filtered.filter(n => n.isPublished)
    } else if (filter === 'draft') {
      filtered = filtered.filter(n => !n.isPublished)
    }

    // 検索クエリ適用
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(query) ||
        n.tag.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allNews, filter, searchQuery])

  const handleEdit = (newsId) => {
    navigate(`/admin/news/${newsId}`)
  }

  const handleTogglePublished = (newsId) => {
    // 後からFirestoreに接続する予定
    alert(`公開状態を切り替えました（ID: ${newsId}）`)
  }

  const handleDelete = (newsId) => {
    if (window.confirm('このお知らせを削除しますか？')) {
      // 後からFirestoreに接続する予定
      alert(`削除しました（ID: ${newsId}）`)
    }
  }

  return (
    <div className={styles.newsEdit}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>お知らせ管理</h1>
          <p className={styles.subtitle}>お知らせの一覧と管理</p>
        </div>
        <Link to="/admin/news/new" className={styles.newButton}>
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
            すべて ({allNews.length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'published' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('published')}
          >
            公開中 ({allNews.filter(n => n.isPublished).length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'draft' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('draft')}
          >
            下書き ({allNews.filter(n => !n.isPublished).length})
          </button>
        </div>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="タイトル、タグで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* お知らせ一覧 */}
      <div className={styles.list}>
        {filteredNews.length === 0 ? (
          <div className={styles.empty}>
            {searchQuery ? '検索結果が見つかりませんでした' : 'お知らせがありません'}
          </div>
        ) : (
          filteredNews.map(news => (
            <div key={news.id} className={styles.item}>
              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <div>
                    <h3 className={styles.itemTitle}>{news.title}</h3>
                    <div className={styles.itemMeta}>
                      <span className={styles.itemDate}>{news.date}</span>
                      <span className={styles.itemTag}>{news.tag}</span>
                      <span className={`${styles.itemStatus} ${news.isPublished ? styles.statusPublished : styles.statusDraft}`}>
                        {news.isPublished ? '公開中' : '下書き'}
                      </span>
                    </div>
                  </div>
                </div>
                {news.link && (
                  <div className={styles.itemLink}>
                    リンク: {news.link}
                  </div>
                )}
                <div className={styles.itemFooter}>
                  <span className={styles.itemUpdated}>
                    更新: {new Date(news.updatedAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>
              <div className={styles.itemActions}>
                <button
                  onClick={() => handleTogglePublished(news.id)}
                  className={styles.actionButton}
                  title={news.isPublished ? '非公開にする' : '公開する'}
                >
                  {news.isPublished ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  onClick={() => handleEdit(news.id)}
                  className={styles.actionButton}
                  title="編集"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(news.id)}
                  className={styles.actionButtonDanger}
                  title="削除"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NewsEdit

