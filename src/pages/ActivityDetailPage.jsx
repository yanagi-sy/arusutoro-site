/**
 * ActivityDetailPage（公演詳細ページ）
 *
 * 公演・イベントの詳細を表示し、開催回選択・予約へ誘導します。
 * データ取得は useActivity、表示用ロジックは utils に委譲しています。
 */

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useActivity } from '../hooks/useActivity'
import { formatDate } from '../utils/format'
import { getRemainingSeats, isSoldOut } from '../utils/activityUtils'
import NotFoundMessage from '../components/NotFoundMessage'
import './ActivityDetailPage.css'

function ActivityDetailPage() {
  const { activityId } = useParams()
  const navigate = useNavigate()
  const { activity, notFound } = useActivity(activityId)
  const [selectedPerformanceId, setSelectedPerformanceId] = useState(null)

  const handlePerformanceSelect = (performanceId) => {
    setSelectedPerformanceId(performanceId)
  }

  const handleReserveClick = () => {
    if (!selectedPerformanceId && activity?.performances?.length > 0) {
      alert('開催回を選択してください')
      return
    }
    navigate(`/reserve/${activityId}`, {
      state: { performanceId: selectedPerformanceId }
    })
  }

  if (notFound) {
    return (
      <div className="activity-detail-page">
        <div className="activity-detail-error">
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
    <div className="activity-detail-page">
      <div className="activity-detail-container">
        {activity.image && (
          <div className="activity-detail-image">
            <img
              src={activity.image}
              alt={`${activity.title} の画像`}
              className="activity-detail-img"
            />
          </div>
        )}

        <h1 className="activity-detail-title">{activity.title}</h1>

        <div className="activity-detail-info-section">
          <div className="activity-detail-info-row">
            <span className="activity-detail-info-label">日程</span>
            <span className="activity-detail-info-value">{activity.period}</span>
          </div>
          {activity.venue && (
            <div className="activity-detail-info-row">
              <span className="activity-detail-info-label">会場</span>
              <span className="activity-detail-info-value">{activity.venue}</span>
            </div>
          )}
        </div>

        {activity.description && (
          <div className="activity-detail-section">
            <h2 className="activity-detail-section-title">公演内容</h2>
            <div className="activity-detail-description">
              <p>{activity.description}</p>
            </div>
          </div>
        )}

        {activity.cast?.length > 0 && (
          <div className="activity-detail-section">
            <h2 className="activity-detail-section-title">キャスト</h2>
            <ul className="activity-detail-list">
              {activity.cast.map((member, index) => (
                <li key={index} className="activity-detail-list-item">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activity.staff?.length > 0 && (
          <div className="activity-detail-section">
            <h2 className="activity-detail-section-title">スタッフ</h2>
            <ul className="activity-detail-list">
              {activity.staff.map((member, index) => (
                <li key={index} className="activity-detail-list-item">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activity.performances?.length > 0 && activity.status === 'active' && (
          <div className="activity-detail-section">
            <h2 className="activity-detail-section-title">開催回を選択</h2>
            <div className="activity-detail-performances">
              {activity.performances.map((performance) => {
                const remainingSeats = getRemainingSeats(performance)
                const selected = selectedPerformanceId === performance.id
                const soldOut = isSoldOut(performance)

                return (
                  <button
                    key={performance.id}
                    type="button"
                    className={`activity-detail-performance-item ${selected ? 'selected' : ''} ${soldOut ? 'sold-out' : ''}`}
                    onClick={() => !soldOut && handlePerformanceSelect(performance.id)}
                    disabled={soldOut}
                  >
                    <div className="activity-detail-performance-date">
                      {formatDate(performance.date)}
                    </div>
                    <div className="activity-detail-performance-time">
                      {performance.time}開演
                    </div>
                    <div className="activity-detail-performance-seats">
                      {soldOut ? (
                        <span className="activity-detail-performance-soldout">満席</span>
                      ) : (
                        <span className="activity-detail-performance-remaining">
                          残り{remainingSeats}席
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {activity.status === 'active' && (
          <div className="activity-detail-actions">
            <button
              type="button"
              className="activity-detail-reserve-btn"
              onClick={handleReserveClick}
              disabled={
                !selectedPerformanceId && activity.performances?.length > 0
              }
            >
              予約する
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityDetailPage
