/**
 * AdSlideFormコンポーネント（広告スライドの新規作成・編集）
 *
 * 広告スライドの新規作成または編集フォームを表示します。
 * DB・APIは使わず、ローカル状態のみで動作する仮実装です。
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getAdSlideById, getAllAdSlides } from '../data/adminData'
import { slideImageLibrary } from '../data/slideImageLibrary'
import styles from './AdSlideForm.module.css'

function AdSlideForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    link: '',
    order: 1,
    isActive: true
  })
  const [loading, setLoading] = useState(!isNew)
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)

  useEffect(() => {
    if (isNew) {
      const all = getAllAdSlides()
      const maxOrder = all.length ? Math.max(...all.map((a) => a.order)) : 0
      setFormData((prev) => ({ ...prev, order: maxOrder + 1 }))
      setLoading(false)
      return
    }
    if (id) {
      const ad = getAdSlideById(id)
      if (ad) {
        setFormData({
          title: ad.title || '',
          imageUrl: ad.imageUrl || '',
          link: ad.link || '',
          order: ad.order ?? 1,
          isActive: ad.isActive ?? true
        })
      }
      setLoading(false)
    }
  }, [id, isNew])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('保存データ（広告）:', formData)
    alert(isNew ? '新規広告スライドを作成しました（ダミー）' : '広告スライドを更新しました（ダミー）')
    navigate('/admin/ads')
  }

  const handleCancel = () => {
    navigate('/admin/ads')
  }

  const handleOpenImagePicker = () => {
    setIsImagePickerOpen(true)
  }

  const handleCloseImagePicker = () => {
    setIsImagePickerOpen(false)
  }

  const handleSelectImage = (src) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: src
    }))
    setIsImagePickerOpen(false)
  }

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>
  }

  return (
    <div className={styles.adSlideForm}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {isNew ? '新規広告スライドを作成' : '広告スライドを編集'}
          </h1>
          <p className={styles.subtitle}>
            {isNew ? '新しい広告スライドを入力してください' : '広告スライドの内容を編集できます'}
          </p>
        </div>
        <Link to="/admin/ads" className={styles.backButton}>
          ← 一覧に戻る
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>基本情報</h2>

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
              placeholder="例：新作公演「月下の舞」"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="imageUrl" className={styles.label}>
              画像 <span className={styles.required}>*</span>
            </label>
            {/* 現在の画像プレビュー */}
            {formData.imageUrl && (
              <div className={styles.imagePreview}>
                <span className={styles.imagePreviewLabel}>選択中の画像</span>
                <img
                  src={formData.imageUrl}
                  alt=""
                  className={styles.imagePreviewImg}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            )}
            {/* URL の直接入力は残しつつ、モバイルでは主にライブラリ選択を利用 */}
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="例：/admin-images/paper-01.jpg"
              required
            />
            <button
              type="button"
              className={styles.imageSelectButton}
              onClick={handleOpenImagePicker}
            >
              画像を選ぶ
            </button>
          </div>

          <div className={styles.field}>
            <label htmlFor="link" className={styles.label}>
              リンクURL <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="例：/activities/perf-1"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="order" className={styles.label}>
              表示順
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              className={styles.input}
              min="1"
            />
            <p className={styles.hint}>数値が小さいほど先に表示されます。</p>
          </div>

          <div className={styles.field}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <span>有効（表示する）</span>
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

      {/* 画像ライブラリ ボトムシート */}
      {isImagePickerOpen && (
        <div className={styles.imagePickerOverlay} onClick={handleCloseImagePicker}>
          <div
            className={styles.imagePickerSheet}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.imagePickerHeader}>
              <span className={styles.imagePickerTitle}>画像ライブラリ</span>
              <button
                type="button"
                className={styles.imagePickerClose}
                onClick={handleCloseImagePicker}
              >
                閉じる
              </button>
            </div>
            <div className={styles.imageGrid}>
              {slideImageLibrary.map((img) => {
                const isSelected = formData.imageUrl === img.src
                return (
                  <button
                    key={img.id}
                    type="button"
                    className={`${styles.imageGridItem} ${
                      isSelected ? styles.imageGridItemSelected : ''
                    }`}
                    onClick={() => handleSelectImage(img.src)}
                  >
                    <div className={styles.imageThumbWrapper}>
                      <img
                        src={img.src}
                        alt={img.label}
                        className={styles.imageThumb}
                      />
                      {isSelected && (
                        <span className={styles.imageSelectedBadge}>選択中</span>
                      )}
                    </div>
                    <span className={styles.imageLabel}>{img.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdSlideForm
