/**
 * ReserveConfirmPage（予約確認ページ）
 *
 * 予約内容の確認表示と、修正・確定・Firestore への保存を担当します。
 * 日付表示は utils/format に委譲しています。
 */

import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { formatDate } from '../utils/format'
import NotFoundMessage from '../components/NotFoundMessage'
import './ReserveConfirmPage.css'

function ReserveConfirmPage() {
  const { activityId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const reservationData = location.state
  const [saving, setSaving] = useState(false)

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

  const {
    activity,
    performance,
    performanceId,
    name,
    email,
    numberOfPeople,
    notes
  } = reservationData

  const handleEditClick = () => {
    navigate(`/reserve/${activityId}`, {
      state: { name, email, numberOfPeople, notes }
    })
  }

  const handleCompleteClick = async () => {
    if (saving) return
    setSaving(true)

    try {
      // キャンセルトークンを生成
      const cancelToken =
        reservationData.cancelToken ||
        'resv-' + Math.random().toString(36).slice(2, 14)

      // Firestore に予約データを書き込み
      await addDoc(collection(db, 'reservations'), {
        performanceId: Number(activityId), // 公演ID（数値に統一）
        slotId: performance?.id || performanceId || 'unknown', // 開催回ID（無ければ 'unknown'）
        name,
        email,
        people: Number(numberOfPeople),
        note: notes || '',
        status: 'active',
        cancelToken,
        createdAt: serverTimestamp()
      })

      // 予約完了ページへ遷移（キャンセルトークンを渡す）
      navigate(`/reserve/${activityId}/complete`, {
        state: { ...reservationData, cancelToken }
      })
    } catch (error) {
      console.error('予約の保存に失敗しました:', error)
      alert('予約の保存に失敗しました。時間をおいて再度お試しください。')
      setSaving(false)
    }
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
            disabled={saving}
          >
            {saving ? '保存中...' : '予約を確定する'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReserveConfirmPage
