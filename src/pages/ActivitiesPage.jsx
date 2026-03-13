/**
 * ActivitiesPage（公演 / イベント一覧ページ）
 *
 * 現在・予定の公演・イベントを一覧表示します。
 * データ取得は useActivities、ステータス表示は utils/activityStatus に委譲しています。
 */

import { useNavigate } from 'react-router-dom'
import { useActivities } from '../hooks/useActivities'
import { getStatusBadge } from '../utils/activityStatus'
import './ActivitiesPage.css'

function ActivitiesPage() {
  const navigate = useNavigate()
  const activities = useActivities()
  const hasActivities = activities.length > 0

  const handleDetailClick = (activityId) => {
    navigate(`/activities/${activityId}`)
  }

  const handleReserveClick = (activityId) => {
    navigate(`/reserve/${activityId}`)
  }

  return (
    <div className="activities-page">
      <div className="activities-header">
        <h1 className="activities-page-title">公演 / イベント</h1>
        <p className="activities-page-subtitle">
          現在・予定の活動のみを掲載しています
        </p>
      </div>

      <section className="activities-section">
        <div className="activities-list">
          {hasActivities ? (
            activities.map((activity) => {
              const badge = getStatusBadge(activity.status)
              return (
                <div key={activity.id} className="activity-card">
                  <div className="activity-date">{activity.period}</div>

                  <div className="activity-header">
                    <div className="activity-badges">
                      <span className="activity-tag">{activity.type}</span>
                      {badge && (
                        <span className={badge.className}>{badge.text}</span>
                      )}
                    </div>
                    <h3 className="activity-title">{activity.title}</h3>
                  </div>

                  <p className="activity-description">{activity.description}</p>

                  <div className="activity-actions">
                    <button
                      type="button"
                      className="activity-btn detail-btn"
                      onClick={() => handleDetailClick(activity.id)}
                    >
                      詳細
                    </button>
                    {activity.status === 'active' && (
                      <button
                        type="button"
                        className="activity-btn reserve-btn"
                        onClick={() => handleReserveClick(activity.id)}
                      >
                        予約
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="activities-empty">
              <p>現在予定されている公演・イベントはありません。</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ActivitiesPage
