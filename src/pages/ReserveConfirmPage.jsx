/**
 * ReserveConfirmPage（予約確認ページ）
 *
 * 予約内容の確認表示と、修正・確定への遷移を担当します。
 * 日付表示は utils/format に委譲しています。
 */

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { formatDate } from '../utils/format'
import NotFoundMessage from '../components/NotFoundMessage'
import './ReserveConfirmPage.css'

function ReserveConfirmPage() {
  const { activityId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const reservationData = location.state

  if (!reservationData) {
    return (
      <div className="reserve-confirm-page">
        <div className="reserve-confirm-error">
          <NotFoundMessage
            title="予約情報が見つかりません"
            description="予約ページから再度お手続きください。"
            backLabel="予約ページに戻る"
            onBack={() => navigate(`/reserve/${activityId}`)}
          />
        </div>
      </div>
    )
  }

  const { activity, performance, name, email, numberOfPeople, notes } =
    reservationData

  const handleEditClick = () => {
    navigate(`/reserve/${activityId}`, {
      state: { name, email, numberOfPeople, notes }
    })
  }

  const handleCompleteClick = () => {
    const cancelToken =
      reservationData.cancelToken ||
      'demo-token-' + Math.random().toString(36).slice(2, 12)
    navigate(`/reserve/${activityId}/complete`, {
      state: { ...reservationData, cancelToken }
    })
  }

  return (
    <div className="reserve-confirm-page">
      <div className="reserve-confirm-container">
        <div className="reserve-confirm-header">
          <h1 className="reserve-confirm-title">予約内容の確認</h1>
        </div>

        <div className="reserve-confirm-content">
          <div className="reserve-confirm-section">
            <h2 className="reserve-confirm-section-title">公演情報</h2>
            <div className="reserve-confirm-info-box">
              <h3 className="reserve-confirm-activity-title">{activity.title}</h3>
              <div className="reserve-confirm-activity-meta">
                <span className="reserve-confirm-activity-tag">{activity.type}</span>
                <span className="reserve-confirm-activity-date">{activity.period}</span>
              </div>
              {performance && (
                <div className="reserve-confirm-performance-info">
                  <div className="reserve-confirm-performance-date">
                    {formatDate(performance.date)}
                  </div>
                  <div className="reserve-confirm-performance-time">
                    {performance.time}開演
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="reserve-confirm-section">
            <h2 className="reserve-confirm-section-title">予約者情報</h2>
            <div className="reserve-confirm-info-box">
              <div className="reserve-confirm-info-row">
                <span className="reserve-confirm-info-label">氏名</span>
                <span className="reserve-confirm-info-value">{name}</span>
              </div>
              <div className="reserve-confirm-info-row">
                <span className="reserve-confirm-info-label">メールアドレス</span>
                <span className="reserve-confirm-info-value">{email}</span>
              </div>
              <div className="reserve-confirm-info-row">
                <span className="reserve-confirm-info-label">人数</span>
                <span className="reserve-confirm-info-value">{numberOfPeople}名</span>
              </div>
              {notes && (
                <div className="reserve-confirm-info-row">
                  <span className="reserve-confirm-info-label">備考</span>
                  <span className="reserve-confirm-info-value">{notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="reserve-confirm-actions">
          <button
            type="button"
            className="reserve-confirm-edit-btn"
            onClick={handleEditClick}
          >
            修正する
          </button>
          <button
            type="button"
            className="reserve-confirm-complete-btn"
            onClick={handleCompleteClick}
          >
            予約を確定する
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReserveConfirmPage
