/**
 * ReserveCompletePage（予約完了ページ）
 *
 * 予約完了メッセージと予約内容の表示、キャンセルURLの表示・コピーを担当します。
 * 日付表示は utils/format に委譲しています。
 */

import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { formatDate } from '../utils/format'
import NotFoundMessage from '../components/NotFoundMessage'
import './ReserveCompletePage.css'

/** デモ用キャンセルトークンを生成（state に無い場合に使用） */
function generateDemoCancelToken() {
  return 'demo-token-' + Math.random().toString(36).slice(2, 12)
}

function ReserveCompletePage() {
  const { activityId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const reservationData = location.state
  const [copied, setCopied] = useState(false)

  const cancelToken = useMemo(() => {
    if (reservationData?.cancelToken) return reservationData.cancelToken
    return generateDemoCancelToken()
  }, [reservationData?.cancelToken])

  const cancelUrl = useMemo(
    () => `${window.location.origin}/cancel?token=${cancelToken}`,
    [cancelToken]
  )

  const handleCopyCancelUrl = async () => {
    try {
      await navigator.clipboard.writeText(cancelUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // フォールバック: input を選択して copy
      const input = document.querySelector('.reserve-complete-cancel-url-input')
      if (input) {
        input.select()
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  if (!reservationData) {
    return (
      <div className="reserve-complete-page">
        <div className="reserve-complete-error">
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

  return (
    <div className="reserve-complete-page">
      <div className="reserve-complete-container">
        <div className="reserve-complete-message">
          <h1 className="reserve-complete-title">予約が完了しました</h1>
          <p className="reserve-complete-text">
            ご予約ありがとうございます。予約内容を確認いただけます。
          </p>
        </div>

        <div className="reserve-complete-content">
          <div className="reserve-complete-section">
            <h2 className="reserve-complete-section-title">公演情報</h2>
            <div className="reserve-complete-info-box">
              <h3 className="reserve-complete-activity-title">{activity.title}</h3>
              <div className="reserve-complete-activity-meta">
                <span className="reserve-complete-activity-tag">{activity.type}</span>
                <span className="reserve-complete-activity-date">{activity.period}</span>
              </div>
              {performance && (
                <div className="reserve-complete-performance-info">
                  <div className="reserve-complete-performance-date">
                    {formatDate(performance.date)}
                  </div>
                  <div className="reserve-complete-performance-time">
                    {performance.time}開演
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="reserve-complete-section">
            <h2 className="reserve-complete-section-title">予約者情報</h2>
            <div className="reserve-complete-info-box">
              <div className="reserve-complete-info-row">
                <span className="reserve-complete-info-label">氏名</span>
                <span className="reserve-complete-info-value">{name}</span>
              </div>
              <div className="reserve-complete-info-row">
                <span className="reserve-complete-info-label">メールアドレス</span>
                <span className="reserve-complete-info-value">{email}</span>
              </div>
              <div className="reserve-complete-info-row">
                <span className="reserve-complete-info-label">人数</span>
                <span className="reserve-complete-info-value">{numberOfPeople}名</span>
              </div>
              {notes && (
                <div className="reserve-complete-info-row">
                  <span className="reserve-complete-info-label">備考</span>
                  <span className="reserve-complete-info-value">{notes}</span>
                </div>
              )}
            </div>
          </div>

          <div className="reserve-complete-section reserve-complete-cancel-section">
            <h2 className="reserve-complete-section-title">キャンセル用URL</h2>
            <div className="reserve-complete-info-box">
              <div className="reserve-complete-cancel-url-row">
                <input
                  type="text"
                  className="reserve-complete-cancel-url-input"
                  value={cancelUrl}
                  readOnly
                  aria-label="キャンセル用URL"
                />
                <button
                  type="button"
                  className="reserve-complete-copy-btn"
                  onClick={handleCopyCancelUrl}
                >
                  {copied ? 'コピーしました' : 'コピー'}
                </button>
              </div>
              <p className="reserve-complete-cancel-notice">
                このURLを紛失すると、予約のキャンセルができません。メールに送付される内容とあわせて大切に保管してください。
              </p>
            </div>
          </div>
        </div>

        <div className="reserve-complete-actions">
          <button
            type="button"
            className="reserve-complete-home-btn"
            onClick={() => navigate('/')}
          >
            トップへ戻る
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReserveCompletePage
