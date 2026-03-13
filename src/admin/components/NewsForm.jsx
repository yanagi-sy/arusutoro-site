/**
 * NewsFormコンポーネント（お知らせの新規作成・編集）
 *
 * お知らせの新規作成または編集フォームを表示します。
 * DB・APIは使わず、ローカル状態のみで動作する仮実装です。
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getNewsById } from '../data/adminData'
import styles from './NewsForm.module.css'

function NewsForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    date: '',
    title: '',
    tag: '公演',
    link: '',
    isPublished: false
  })
  const [loading, setLoading] = useState(!isNew)

  useEffect(() => {
    if (!isNew && id) {
      const news = getNewsById(id)
      if (news) {
        setFormData({
          date: news.date || '',
          title: news.title || '',
          tag: news.tag || '公演',
          link: news.link || '',
          isPublished: news.isPublished ?? false
        })
      }
      setLoading(false)
    }
  }, [id, isNew])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('保存データ（お知らせ）:', formData)
    alert(isNew ? '新規お知らせを作成しました（ダミー）' : 'お知らせを更新しました（ダミー）')
    navigate('/admin/news')
  }

  const handleCancel = () => {
    navigate('/admin/news')
  }

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>
  }

  return (
    <div className={styles.newsForm}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {isNew ? '新規お知らせを作成' : 'お知らせを編集'}
          </h1>
          <p className={styles.subtitle}>
            {isNew ? '新しいお知らせを入力してください' : 'お知らせ内容を編集できます'}
          </p>
        </div>
        <Link to="/admin/news" className={styles.backButton}>
          ← 一覧に戻る
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>基本情報</h2>

          <div className={styles.field}>
            <label htmlFor="date" className={styles.label}>
              日付 <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              タイトル <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="例：新作公演「月下の舞」上演決定"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="tag" className={styles.label}>
              タグ <span className={styles.required}>*</span>
            </label>
            <select
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              <option value="公演">公演</option>
              <option value="イベント">イベント</option>
              <option value="募集">募集</option>
              <option value="外部">外部</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="link" className={styles.label}>
              リンクURL
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="例：/activities/perf-1 または https://..."
            />
          </div>

          <div className={styles.field}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <span>公開する</span>
            </label>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            キャンセル
          </button>
          <button type="submit" className={styles.saveButton}>
            {isNew ? '作成' : '更新'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsForm
