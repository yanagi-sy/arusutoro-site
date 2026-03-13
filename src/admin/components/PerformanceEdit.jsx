/**
 * PerformanceEditコンポーネント（公演編集）
 * 
 * 公演の新規作成・編集を行うコンポーネントです。
 * 公開/非公開、終了、予約可否の設定が可能です。
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPerformanceById, getSessionsByPerformanceId } from '../data/adminData'
import styles from './PerformanceEdit.module.css'

/**
 * PerformanceEditコンポーネント
 * 
 * @returns {JSX.Element} 公演編集画面
 */
function PerformanceEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    title: '',
    type: '公演',
    status: 'draft',
    isReservable: false,
    startDate: '',
    endDate: '',
    venue: '',
    description: '',
    cast: [],
    staff: []
  })

  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(!isNew)

  // 編集時は既存データを読み込み
  useEffect(() => {
    if (!isNew && id) {
      const performance = getPerformanceById(id)
      if (performance) {
        setFormData({
          title: performance.title || '',
          type: performance.type || '公演',
          status: performance.status || 'draft',
          isReservable: performance.isReservable || false,
          startDate: performance.startDate || '',
          endDate: performance.endDate || '',
          venue: performance.venue || '',
          description: performance.description || '',
          cast: performance.cast ? [...performance.cast] : [],
          staff: performance.staff ? [...performance.staff] : []
        })
        const performanceSessions = getSessionsByPerformanceId(id)
        setSessions(performanceSessions.map(s => ({ ...s })))
      }
      setLoading(false)
    }
  }, [id, isNew])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleArrayFieldChange = (fieldName, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[fieldName]]
      newArray[index] = value
      return {
        ...prev,
        [fieldName]: newArray
      }
    })
  }

  const handleAddArrayItem = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }))
  }

  const handleRemoveArrayItem = (fieldName, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }))
  }

  const handleAddSession = () => {
    const newSession = {
      id: `session-${Date.now()}`,
      date: '',
      time: '',
      capacity: '',
      reserved: 0
    }
    setSessions(prev => [...prev, newSession])
  }

  const handleRemoveSession = (sessionId) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId))
  }

  const handleSessionChange = (sessionId, field, value) => {
    setSessions(prev => prev.map(s =>
      s.id === sessionId ? { ...s, [field]: value } : s
    ))
  }

  const handleSave = (e) => {
    e.preventDefault()
    // 後からFirestoreに接続する予定
    console.log('保存データ:', { formData, sessions })
    alert(isNew ? '新規公演を作成しました（ダミー）' : '公演を更新しました（ダミー）')
    navigate('/admin/performances')
  }

  const handleCancel = () => {
    navigate('/admin/performances')
  }

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>
  }

  return (
    <div className={styles.performanceEdit}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {isNew ? '新規公演を作成' : '公演を編集'}
          </h1>
          <p className={styles.subtitle}>
            {isNew ? '新しい公演情報を入力してください' : '公演情報を編集できます'}
          </p>
        </div>
        <Link to="/admin/performances" className={styles.backButton}>
          ← 一覧に戻る
        </Link>
      </div>

      <form onSubmit={handleSave} className={styles.form}>
        {/* 基本情報 */}
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
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="type" className={styles.label}>
                種別 <span className={styles.required}>*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="公演">公演</option>
                <option value="イベント">イベント</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="status" className={styles.label}>
                ステータス <span className={styles.required}>*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="published">公開</option>
                <option value="draft">下書き</option>
                <option value="ended">終了</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isReservable"
                checked={formData.isReservable}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <span>予約受付可能</span>
            </label>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="startDate" className={styles.label}>
                開始日 <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="endDate" className={styles.label}>
                終了日 <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="venue" className={styles.label}>
              会場
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              説明
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
              rows="6"
            />
          </div>
        </div>

        {/* キャスト */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>キャスト</h2>
            <button
              type="button"
              onClick={() => handleAddArrayItem('cast')}
              className={styles.addButton}
            >
              ➕ 追加
            </button>
          </div>

          {formData.cast.map((member, index) => (
            <div key={index} className={styles.arrayItem}>
              <input
                type="text"
                value={member}
                onChange={(e) => handleArrayFieldChange('cast', index, e.target.value)}
                className={styles.input}
                placeholder="キャスト名"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem('cast', index)}
                className={styles.removeButton}
              >
                削除
              </button>
            </div>
          ))}
        </div>

        {/* スタッフ */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>スタッフ</h2>
            <button
              type="button"
              onClick={() => handleAddArrayItem('staff')}
              className={styles.addButton}
            >
              ➕ 追加
            </button>
          </div>

          {formData.staff.map((member, index) => (
            <div key={index} className={styles.arrayItem}>
              <input
                type="text"
                value={member}
                onChange={(e) => handleArrayFieldChange('staff', index, e.target.value)}
                className={styles.input}
                placeholder="スタッフ名（例：演出：演出家X）"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem('staff', index)}
                className={styles.removeButton}
              >
                削除
              </button>
            </div>
          ))}
        </div>

        {/* 開催回 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>開催回（日付・時間帯）</h2>
            <button
              type="button"
              onClick={handleAddSession}
              className={styles.addButton}
            >
              ➕ 追加
            </button>
          </div>

          {sessions.map((session) => (
            <div key={session.id} className={styles.sessionItem}>
              <div className={styles.sessionRow}>
                <div className={styles.field}>
                  <label className={styles.label}>日付</label>
                  <input
                    type="date"
                    value={session.date}
                    onChange={(e) => handleSessionChange(session.id, 'date', e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>時間</label>
                  <input
                    type="time"
                    value={session.time}
                    onChange={(e) => handleSessionChange(session.id, 'time', e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>定員</label>
                  <input
                    type="number"
                    value={session.capacity}
                    onChange={(e) => handleSessionChange(session.id, 'capacity', Number(e.target.value))}
                    className={styles.input}
                    min="1"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSession(session.id)}
                  className={styles.removeButton}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* アクション */}
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

export default PerformanceEdit

