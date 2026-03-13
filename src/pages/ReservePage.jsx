/**
 * ReservePage（予約ページ）
 *
 * 公演・イベントの予約フォームを表示します。
 * データ取得は useActivity、日付表示は utils/format に委譲しています。
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useActivity } from '../hooks/useActivity'
import { formatDate } from '../utils/format'
import NotFoundMessage from '../components/NotFoundMessage'
import './ReservePage.css'

function ReservePage() {
  const { activityId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { activity, notFound } = useActivity(activityId)

  const [selectedPerformanceId, setSelectedPerformanceId] = useState(
    location.state?.performanceId ?? null
  )
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    numberOfPeople: '',
    notes: ''
  })

  const selectedPerformance = activity?.performances?.find(
    (p) => p.id === selectedPerformanceId
  )

  useEffect(() => {
    if (location.state?.name != null) {
      setFormData({
        name: location.state.name ?? '',
        email: location.state.email ?? '',
        numberOfPeople: location.state.numberOfPeople ?? '',
        notes: location.state.notes ?? ''
      })
    }
  }, [location.state])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleConfirmClick = () => {
    navigate(`/reserve/${activityId}/confirm`, {
      state: {
        activityId: Number(activityId),
        activity,
        performanceId: selectedPerformanceId,
        performance: selectedPerformance,
        name: formData.name,
        email: formData.email,
        numberOfPeople: formData.numberOfPeople,
        notes: formData.notes
      }
    })
  }

  if (notFound) {
    return (
      <div className="reserve-page">
        <div className="reserve-error">
          <NotFoundMessage
            title="公演・イベントが見つかりません"
            description="指定されたIDの公演・イベントは存在しません。"
            backLabel="一覧に戻る"
            onBack={() => navigate('/activities')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="reserve-page">
      <div className="reserve-container">
        <div className="reserve-header">
          <h1 className="reserve-title">予約</h1>
          <div className="reserve-activity-info">
            <h2 className="reserve-activity-title">{activity.title}</h2>
            <div className="reserve-activity-meta">
              <span className="reserve-activity-tag">{activity.type}</span>
              <span className="reserve-activity-date">{activity.period}</span>
            </div>
            {selectedPerformance && (
              <div className="reserve-performance-info">
                <div className="reserve-performance-date">
                  {formatDate(selectedPerformance.date)}
                </div>
                <div className="reserve-performance-time">
                  {selectedPerformance.time}開演
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="reserve-form-card">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleConfirmClick()
            }}
          >
            <div className="reserve-form-field">
              <label htmlFor="name" className="reserve-form-label">
                氏名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="reserve-form-input"
                required
              />
            </div>

            <div className="reserve-form-field">
              <label htmlFor="email" className="reserve-form-label">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="reserve-form-input"
                required
              />
            </div>

            <div className="reserve-form-field">
              <label htmlFor="numberOfPeople" className="reserve-form-label">
                人数
              </label>
              <input
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
                className="reserve-form-input"
                min="1"
                required
              />
            </div>

            <div className="reserve-form-field">
              <label htmlFor="notes" className="reserve-form-label">
                備考（任意）
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="reserve-form-textarea"
                rows="4"
                placeholder="車椅子利用など身体的配慮が必要な場合はご記入ください"
              />
            </div>

            <div className="reserve-form-submit">
              <button type="submit" className="reserve-confirm-btn">
                内容を確認する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReservePage
