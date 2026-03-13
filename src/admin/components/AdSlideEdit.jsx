/**
 * AdSlideEditコンポーネント（広告スライド管理）
 * 
 * 広告スライドの一覧表示と編集を行うコンポーネントです。
 */

import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAllAdSlides } from '../data/adminData'
import styles from './AdSlideEdit.module.css'

/**
 * AdSlideEditコンポーネント
 * 
 * @returns {JSX.Element} 広告スライド管理画面
 */
function AdSlideEdit() {
  const navigate = useNavigate()
  const allAdSlides = useMemo(() => getAllAdSlides(), [])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'inactive'

  const filteredAdSlides = useMemo(() => {
    let filtered = allAdSlides

    // フィルター適用
    if (filter === 'active') {
      filtered = filtered.filter(a => a.isActive)
    } else if (filter === 'inactive') {
      filtered = filtered.filter(a => !a.isActive)
    }

    // 検索クエリ適用
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allAdSlides, filter, searchQuery])

  const handleEdit = (adId) => {
    navigate(`/admin/ads/${adId}`)
  }

  const handleToggleActive = (adId) => {
    // 後からFirestoreに接続する予定
    alert(`表示状態を切り替えました（ID: ${adId}）`)
  }

  const handleDelete = (adId) => {
    if (window.confirm('この広告スライドを削除しますか？')) {
      // 後からFirestoreに接続する予定
      alert(`削除しました（ID: ${adId}）`)
    }
  }

  const handleMoveOrder = (adId, direction) => {
    // 後からFirestoreに接続する予定
    alert(`順序を変更しました（ID: ${adId}, 方向: ${direction}）`)
  }

  return (
    <div className={styles.adSlideEdit}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>広告スライド管理</h1>
          <p className={styles.subtitle}>広告スライドの一覧と管理</p>
        </div>
        <Link to="/admin/ads/new" className={styles.newButton}>
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
            すべて ({allAdSlides.length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'active' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('active')}
          >
            有効 ({allAdSlides.filter(a => a.isActive).length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'inactive' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('inactive')}
          >
            無効 ({allAdSlides.filter(a => !a.isActive).length})
          </button>
        </div>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="タイトルで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* 広告スライド一覧 */}
      <div className={styles.list}>
        {filteredAdSlides.length === 0 ? (
          <div className={styles.empty}>
            {searchQuery ? '検索結果が見つかりませんでした' : '広告スライドがありません'}
          </div>
        ) : (
          filteredAdSlides.map((ad, index) => (
            <div key={ad.id} className={styles.item}>
              <div className={styles.itemOrder}>
                <span className={styles.orderNumber}>{ad.order}</span>
                <div className={styles.orderButtons}>
                  <button
                    onClick={() => handleMoveOrder(ad.id, 'up')}
                    className={styles.orderButton}
                    disabled={index === 0}
                    title="上へ移動"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveOrder(ad.id, 'down')}
                    className={styles.orderButton}
                    disabled={index === filteredAdSlides.length - 1}
                    title="下へ移動"
                  >
                    ↓
                  </button>
                </div>
              </div>

              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <div>
                    <h3 className={styles.itemTitle}>{ad.title}</h3>
                    <div className={styles.itemMeta}>
                      <span className={styles.itemLink}>リンク: {ad.link}</span>
                      <span className={`${styles.itemStatus} ${ad.isActive ? styles.statusActive : styles.statusInactive}`}>
                        {ad.isActive ? '有効' : '無効'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.itemImage}>
                  <div className={styles.imagePlaceholder}>
                    <span>画像プレビュー</span>
                    <span className={styles.imageUrl}>{ad.imageUrl}</span>
                  </div>
                </div>
                <div className={styles.itemFooter}>
                  <span className={styles.itemUpdated}>
                    更新: {new Date(ad.updatedAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>

              <div className={styles.itemActions}>
                <button
                  onClick={() => handleToggleActive(ad.id)}
                  className={styles.actionButton}
                  title={ad.isActive ? '無効にする' : '有効にする'}
                >
                  {ad.isActive ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  onClick={() => handleEdit(ad.id)}
                  className={styles.actionButton}
                  title="編集"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
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

export default AdSlideEdit

