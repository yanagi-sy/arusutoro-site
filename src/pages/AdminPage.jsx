/**
 * AdminPageコンポーネント（管理者ページ）
 * 
 * 公演・イベントの管理を行うページです（UIのみ、実通信なし）。
 * 後からFirebaseに接続する予定です。
 * 
 * 【主な機能】
 * - 公演一覧の表示
 * - 公演編集フォーム
 * - 開催回の追加・削除UI
 */

// useStateフックをインポート（状態管理用）
import { useState } from 'react'
// AdminPageコンポーネント用のスタイルを読み込み
import './AdminPage.css'
// 公演データ取得はサービス層経由（後からFirebaseに差し替える場合は services/activityService.js を修正）
import { getAllActivities } from '../services/activityService'

/**
 * AdminPageコンポーネント
 * @returns {JSX.Element} 管理者ページ
 */
function AdminPage() {
  // サービス層から活動データを取得（後からFirebaseに差し替える予定）
  const [activities] = useState(getAllActivities())
  
  // 選択された公演のIDを管理
  const [selectedActivityId, setSelectedActivityId] = useState(null)
  
  // 編集フォームの状態管理
  const [formData, setFormData] = useState({
    title: '',
    type: '公演',
    status: 'active',
    startDate: '',
    endDate: '',
    venue: '',
    description: '',
    cast: [],
    staff: []
  })
  
  // 開催回の状態管理
  const [performances, setPerformances] = useState([])
  
  // 選択された公演を取得
  const selectedActivity = activities.find(a => a.id === selectedActivityId)
  
  /**
   * 公演を選択するハンドラ
   * 
   * @param {number} activityId - 選択された公演のID
   */
  const handleActivitySelect = (activityId) => {
    setSelectedActivityId(activityId)
    const activity = activities.find(a => a.id === activityId)
    if (activity) {
      setFormData({
        title: activity.title || '',
        type: activity.type || '公演',
        status: activity.status || 'active',
        startDate: activity.startDate || '',
        endDate: activity.endDate || '',
        venue: activity.venue || '',
        description: activity.description || '',
        cast: activity.cast || [],
        staff: activity.staff || []
      })
      setPerformances(activity.performances || [])
    }
  }
  
  /**
   * フォーム入力の変更ハンドラ
   * 
   * @param {Object} e - イベントオブジェクト
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  /**
   * 配列フィールド（キャスト・スタッフ）の変更ハンドラ
   * 
   * @param {string} fieldName - フィールド名（'cast' または 'staff'）
   * @param {number} index - インデックス
   * @param {string} value - 新しい値
   */
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
  
  /**
   * 配列フィールドに項目を追加
   * 
   * @param {string} fieldName - フィールド名（'cast' または 'staff'）
   */
  const handleAddArrayItem = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }))
  }
  
  /**
   * 配列フィールドから項目を削除
   * 
   * @param {string} fieldName - フィールド名（'cast' または 'staff'）
   * @param {number} index - 削除するインデックス
   */
  const handleRemoveArrayItem = (fieldName, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }))
  }
  
  /**
   * 開催回を追加
   */
  const handleAddPerformance = () => {
    const newPerformance = {
      id: `perf-${Date.now()}`,
      date: '',
      time: '',
      capacity: '',
      reserved: 0
    }
    setPerformances(prev => [...prev, newPerformance])
  }
  
  /**
   * 開催回を削除
   * 
   * @param {string} performanceId - 削除する開催回のID
   */
  const handleRemovePerformance = (performanceId) => {
    setPerformances(prev => prev.filter(p => p.id !== performanceId))
  }
  
  /**
   * 開催回の変更ハンドラ
   * 
   * @param {string} performanceId - 変更する開催回のID
   * @param {string} field - フィールド名
   * @param {string|number} value - 新しい値
   */
  const handlePerformanceChange = (performanceId, field, value) => {
    setPerformances(prev => prev.map(p => 
      p.id === performanceId ? { ...p, [field]: value } : p
    ))
  }
  
  /**
   * 保存ボタンのクリックハンドラ
   * 後からFirebaseに接続する予定
   */
  const handleSave = () => {
    // 後からFirebaseに接続する予定
    alert('保存機能は後からFirebaseに接続する予定です')
    console.log('保存データ:', { formData, performances })
  }
  
  /**
   * 新規作成ボタンのクリックハンドラ
   */
  const handleNew = () => {
    setSelectedActivityId(null)
    setFormData({
      title: '',
      type: '公演',
      status: 'active',
      startDate: '',
      endDate: '',
      venue: '',
      description: '',
      cast: [],
      staff: []
    })
    setPerformances([])
  }
  
  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* ヘッダー */}
        <div className="admin-header">
          <h1 className="admin-title">管理者ページ</h1>
          <p className="admin-subtitle">公演・イベントの管理（UIのみ、実通信なし）</p>
        </div>
        
        <div className="admin-content">
          {/* 左側：公演一覧 */}
          <div className="admin-activities-list">
            <div className="admin-section-header">
              <h2 className="admin-section-title">公演一覧</h2>
              <button
                type="button"
                className="admin-new-btn"
                onClick={handleNew}
              >
                新規作成
              </button>
            </div>
            
            <div className="admin-activities-items">
              {activities.map(activity => (
                <div
                  key={activity.id}
                  className={`admin-activity-item ${selectedActivityId === activity.id ? 'selected' : ''}`}
                  onClick={() => handleActivitySelect(activity.id)}
                >
                  <div className="admin-activity-item-title">{activity.title}</div>
                  <div className="admin-activity-item-meta">
                    <span className="admin-activity-item-type">{activity.type}</span>
                    <span className={`admin-activity-item-status admin-activity-item-status-${activity.status}`}>
                      {activity.status === 'active' ? '予約受付中' : 
                       activity.status === 'coming_soon' ? 'Coming Soon' : '終了'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 右側：編集フォーム */}
          <div className="admin-edit-form">
            <div className="admin-section-header">
              <h2 className="admin-section-title">
                {selectedActivityId ? '公演を編集' : '新規公演を作成'}
              </h2>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              {/* 基本情報 */}
              <div className="admin-form-section">
                <h3 className="admin-form-section-title">基本情報</h3>
                
                <div className="admin-form-field">
                  <label htmlFor="title" className="admin-form-label">
                    タイトル <span className="admin-form-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="admin-form-input"
                    required
                  />
                </div>
                
                <div className="admin-form-row">
                  <div className="admin-form-field">
                    <label htmlFor="type" className="admin-form-label">
                      種別 <span className="admin-form-required">*</span>
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="admin-form-select"
                      required
                    >
                      <option value="公演">公演</option>
                      <option value="イベント">イベント</option>
                    </select>
                  </div>
                  
                  <div className="admin-form-field">
                    <label htmlFor="status" className="admin-form-label">
                      ステータス <span className="admin-form-required">*</span>
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="admin-form-select"
                      required
                    >
                      <option value="active">予約受付中</option>
                      <option value="coming_soon">Coming Soon</option>
                      <option value="ended">終了</option>
                    </select>
                  </div>
                </div>
                
                <div className="admin-form-row">
                  <div className="admin-form-field">
                    <label htmlFor="startDate" className="admin-form-label">
                      開始日 <span className="admin-form-required">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="admin-form-input"
                      required
                    />
                  </div>
                  
                  <div className="admin-form-field">
                    <label htmlFor="endDate" className="admin-form-label">
                      終了日 <span className="admin-form-required">*</span>
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="admin-form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="admin-form-field">
                  <label htmlFor="venue" className="admin-form-label">
                    会場
                  </label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    className="admin-form-input"
                  />
                </div>
                
                <div className="admin-form-field">
                  <label htmlFor="description" className="admin-form-label">
                    説明
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="admin-form-textarea"
                    rows="4"
                  />
                </div>
              </div>
              
              {/* キャスト */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <h3 className="admin-form-section-title">キャスト</h3>
                  <button
                    type="button"
                    className="admin-form-add-btn"
                    onClick={() => handleAddArrayItem('cast')}
                  >
                    追加
                  </button>
                </div>
                
                {formData.cast.map((member, index) => (
                  <div key={index} className="admin-form-array-item">
                    <input
                      type="text"
                      value={member}
                      onChange={(e) => handleArrayFieldChange('cast', index, e.target.value)}
                      className="admin-form-input"
                      placeholder="キャスト名"
                    />
                    <button
                      type="button"
                      className="admin-form-remove-btn"
                      onClick={() => handleRemoveArrayItem('cast', index)}
                    >
                      削除
                    </button>
                  </div>
                ))}
              </div>
              
              {/* スタッフ */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <h3 className="admin-form-section-title">スタッフ</h3>
                  <button
                    type="button"
                    className="admin-form-add-btn"
                    onClick={() => handleAddArrayItem('staff')}
                  >
                    追加
                  </button>
                </div>
                
                {formData.staff.map((member, index) => (
                  <div key={index} className="admin-form-array-item">
                    <input
                      type="text"
                      value={member}
                      onChange={(e) => handleArrayFieldChange('staff', index, e.target.value)}
                      className="admin-form-input"
                      placeholder="スタッフ名（例：演出：演出家X）"
                    />
                    <button
                      type="button"
                      className="admin-form-remove-btn"
                      onClick={() => handleRemoveArrayItem('staff', index)}
                    >
                      削除
                    </button>
                  </div>
                ))}
              </div>
              
              {/* 開催回 */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <h3 className="admin-form-section-title">開催回</h3>
                  <button
                    type="button"
                    className="admin-form-add-btn"
                    onClick={handleAddPerformance}
                  >
                    追加
                  </button>
                </div>
                
                {performances.map((performance) => (
                  <div key={performance.id} className="admin-form-performance-item">
                    <div className="admin-form-row">
                      <div className="admin-form-field">
                        <label className="admin-form-label">日付</label>
                        <input
                          type="date"
                          value={performance.date}
                          onChange={(e) => handlePerformanceChange(performance.id, 'date', e.target.value)}
                          className="admin-form-input"
                        />
                      </div>
                      
                      <div className="admin-form-field">
                        <label className="admin-form-label">時間</label>
                        <input
                          type="time"
                          value={performance.time}
                          onChange={(e) => handlePerformanceChange(performance.id, 'time', e.target.value)}
                          className="admin-form-input"
                        />
                      </div>
                      
                      <div className="admin-form-field">
                        <label className="admin-form-label">定員</label>
                        <input
                          type="number"
                          value={performance.capacity}
                          onChange={(e) => handlePerformanceChange(performance.id, 'capacity', Number(e.target.value))}
                          className="admin-form-input"
                          min="1"
                        />
                      </div>
                      
                      <button
                        type="button"
                        className="admin-form-remove-btn"
                        onClick={() => handleRemovePerformance(performance.id)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 保存ボタン */}
              <div className="admin-form-actions">
                <button type="submit" className="admin-save-btn">
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// AdminPageコンポーネントを他のファイルで使用できるようにエクスポート
export default AdminPage

