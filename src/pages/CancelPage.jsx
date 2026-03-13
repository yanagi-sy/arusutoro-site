/**
 * CancelPage（キャンセルページ）
 *
 * URLクエリ token で予約を識別し、キャンセル確認・完了を表示します。
 * トークンが無い場合はトークン/URL入力フォームを表示し、入力後に確認画面へ遷移します。
 * 仮実装のためDB更新は行わず、画面状態のみ切り替えます。
 */

import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import './CancelPage.css'

/** トークンから仮の予約サマリを返す（後でDB取得に差し替え可能） */
function getMockReservationByToken(token) {
  return {
    title: 'サンプル公演',
    slot: '4月15日（火） 19:00開演',
    slotDate: '2025-04-15',
    slotTime: '19:00',
    name: '予約者 様',
    email: 'yoyaku@example.com',
    numberOfPeople: 2,
    notes: ''
  }
}

/** 入力文字列からトークンを抽出（URLの場合は ?token= 以降、それ以外はそのまま） */
function extractToken(input) {
  const trimmed = (input || '').trim()
  if (!trimmed) return ''
  try {
    const url = new URL(trimmed)
    return url.searchParams.get('token') || trimmed
  } catch {
    return trimmed
  }
}

function CancelPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const tokenFromUrl = searchParams.get('token')

  const [tokenInput, setTokenInput] = useState('')
  const [confirmToken, setConfirmToken] = useState(tokenFromUrl || null)
  const [cancelled, setCancelled] = useState(false)

  const token = confirmToken || tokenFromUrl

  const handleTokenSubmit = (e) => {
    e.preventDefault()
    const t = extractToken(tokenInput)
    if (t) {
      setConfirmToken(t)
      setTokenInput('')
    }
  }

  const handleCancelConfirm = () => {
    setCancelled(true)
  }

  const handleBackToTop = () => {
    navigate('/')
  }

  if (cancelled && token) {
    const mock = getMockReservationByToken(token)
    return (
      <div className="cancel-page">
        <div className="cancel-container">
          <div className="cancel-message cancel-message-success">
            <h1 className="cancel-title">キャンセルが完了しました</h1>
            <p className="cancel-text">
              {mock.title} のご予約をキャンセルしました。
            </p>
          </div>
          <div className="cancel-actions">
            <button
              type="button"
              className="cancel-home-btn"
              onClick={handleBackToTop}
            >
              トップへ戻る
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (token) {
    const mock = getMockReservationByToken(token)
    return (
      <div className="cancel-page">
        <div className="cancel-container">
          <div className="cancel-message">
            <h1 className="cancel-title">予約のキャンセル</h1>
            <p className="cancel-text">
              以下の予約をキャンセルしますか？
            </p>
          </div>
          <div className="cancel-content">
            <div className="cancel-section">
              <h2 className="cancel-section-title">予約内容</h2>
              <div className="cancel-info-box">
                <div className="cancel-info-row">
                  <span className="cancel-info-label">公演名</span>
                  <span className="cancel-info-value">{mock.title}</span>
                </div>
                <div className="cancel-info-row">
                  <span className="cancel-info-label">回</span>
                  <span className="cancel-info-value">{mock.slot}</span>
                </div>
                <div className="cancel-info-row">
                  <span className="cancel-info-label">氏名</span>
                  <span className="cancel-info-value">{mock.name}</span>
                </div>
                <div className="cancel-info-row">
                  <span className="cancel-info-label">メールアドレス</span>
                  <span className="cancel-info-value">{mock.email}</span>
                </div>
                <div className="cancel-info-row">
                  <span className="cancel-info-label">人数</span>
                  <span className="cancel-info-value">{mock.numberOfPeople}名</span>
                </div>
                {mock.notes && (
                  <div className="cancel-info-row">
                    <span className="cancel-info-label">備考</span>
                    <span className="cancel-info-value">{mock.notes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="cancel-actions cancel-actions-multi">
            <button
              type="button"
              className="cancel-back-btn"
              onClick={() => {
                if (confirmToken) setConfirmToken(null)
                else navigate('/cancel')
              }}
            >
              戻る
            </button>
            <button
              type="button"
              className="cancel-submit-btn"
              onClick={handleCancelConfirm}
            >
              キャンセルする
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cancel-page">
      <div className="cancel-container">
        <div className="cancel-message">
          <h1 className="cancel-title">予約のキャンセル</h1>
          <p className="cancel-text">
            予約完了メールに記載のキャンセル用URL、またはトークンを入力してください。
          </p>
        </div>
        <form className="cancel-form" onSubmit={handleTokenSubmit}>
          <div className="cancel-form-group">
            <label htmlFor="cancel-token" className="cancel-form-label">
              キャンセル用URL または トークン
            </label>
            <input
              id="cancel-token"
              type="text"
              className="cancel-form-input"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="https://.../cancel?token=xxx または トークン文字列"
              autoComplete="off"
            />
          </div>
          <div className="cancel-actions">
            <button type="submit" className="cancel-submit-btn" disabled={!tokenInput.trim()}>
              確認する
            </button>
          </div>
        </form>
        <div className="cancel-actions">
          <button
            type="button"
            className="cancel-home-btn cancel-home-btn-secondary"
            onClick={handleBackToTop}
          >
            トップへ戻る
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelPage
