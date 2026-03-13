/**
 * ReservationsPage（予約管理）
 *
 * 予約一覧・フィルタ・検索・詳細表示・キャンセル・管理者メモを扱います。
 * ダミーデータで仮実装。Firebase/Fetch は使用しません。
 */

import { useState, useMemo } from 'react'
import {
  performances,
  slots,
  reservations as initialReservations,
  getReservedCountBySlot
} from '../data/reservations.mock'
import styles from './ReservationsPage.module.css'

const PERFORMANCE_ALL = ''
const SLOT_ALL = ''
const STATUS_ALL = ''

function formatDateTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatSlotDate(date, time) {
  if (!date) return '—'
  const d = new Date(date)
  const ymd = d.toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit', weekday: 'short' })
  return time ? `${ymd} ${time}` : ymd
}

function ReservationsPage() {
  const [reservations, setReservations] = useState(initialReservations)
  const [selectedId, setSelectedId] = useState(null)

  const [filterPerformance, setFilterPerformance] = useState(PERFORMANCE_ALL)
  const [filterSlot, setFilterSlot] = useState(SLOT_ALL)
  const [filterStatus, setFilterStatus] = useState(STATUS_ALL)
  const [searchText, setSearchText] = useState('')

  const slotsByPerformance = useMemo(() => {
    const map = {}
    performances.forEach((p) => {
      map[p.id] = slots.filter((s) => s.performanceId === p.id)
    })
    return map
  }, [])

  const slotOptions = useMemo(() => {
    if (!filterPerformance) return slots
    return slotsByPerformance[filterPerformance] || []
  }, [filterPerformance, slotsByPerformance])

  const reservedBySlot = useMemo(() => getReservedCountBySlot(reservations), [reservations])

  const filteredReservations = useMemo(() => {
    let list = reservations
    if (filterPerformance) list = list.filter((r) => r.performanceId === filterPerformance)
    if (filterSlot) list = list.filter((r) => r.slotId === filterSlot)
    if (filterStatus) list = list.filter((r) => r.status === filterStatus)
    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase()
      list = list.filter(
        (r) =>
          (r.name && r.name.toLowerCase().includes(q)) ||
          (r.email && r.email.toLowerCase().includes(q)) ||
          (r.memo && r.memo.toLowerCase().includes(q))
      )
    }
    return list
  }, [reservations, filterPerformance, filterSlot, filterStatus, searchText])

  const selected = useMemo(
    () => (selectedId ? reservations.find((r) => r.id === selectedId) : null),
    [reservations, selectedId]
  )

  const selectedSlot = useMemo(
    () => (selected ? slots.find((s) => s.id === selected.slotId) : null),
    [selected, slots]
  )

  const selectedPerformance = useMemo(
    () => (selected ? performances.find((p) => p.id === selected.performanceId) : null),
    [selected, performances]
  )

  const handleCancelReservation = (id) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r))
    )
    setSelectedId(null)
  }

  const handleAdminNoteChange = (id, value) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, adminNote: value } : r))
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>予約管理</h1>
        <p className={styles.subtitle}>予約一覧・検索・詳細・キャンセル・管理者メモ</p>
      </header>

      {/* 回ごと 定員/予約数/残数 */}
      <section className={styles.slotSummary}>
        <h2 className={styles.slotSummaryTitle}>回ごとの予約状況</h2>
        <div className={styles.slotSummaryGrid}>
          {slots.map((slot) => {
            const perf = performances.find((p) => p.id === slot.performanceId)
            const reserved = reservedBySlot[slot.id] || 0
            const remaining = Math.max(0, slot.capacity - reserved)
            return (
              <div key={slot.id} className={styles.slotSummaryCard}>
                <div className={styles.slotSummaryCardTitle}>
                  {perf ? perf.title : slot.performanceId}
                </div>
                <div className={styles.slotSummaryCardSlot}>
                  {formatSlotDate(slot.date, slot.time)}
                </div>
                <div className={styles.slotSummaryCardNumbers}>
                  <span>定員 {slot.capacity}</span>
                  <span>予約 {reserved}</span>
                  <span className={remaining === 0 ? styles.slotSummaryRemainingZero : ''}>
                    残 {remaining}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* フィルタ */}
      <section className={styles.toolbar}>
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>公演</label>
            <select
              className={styles.filterSelect}
              value={filterPerformance}
              onChange={(e) => {
                setFilterPerformance(e.target.value)
                setFilterSlot(SLOT_ALL)
              }}
            >
              <option value={PERFORMANCE_ALL}>すべて</option>
              {performances.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>回（日時）</label>
            <select
              className={styles.filterSelect}
              value={filterSlot}
              onChange={(e) => setFilterSlot(e.target.value)}
            >
              <option value={SLOT_ALL}>すべて</option>
              {slotOptions.map((s) => {
                const perf = performances.find((p) => p.id === s.performanceId)
                return (
                  <option key={s.id} value={s.id}>
                    {perf ? perf.title : s.performanceId} — {formatSlotDate(s.date, s.time)}
                  </option>
                )
              })}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>ステータス</label>
            <select
              className={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value={STATUS_ALL}>すべて</option>
              <option value="active">予約中</option>
              <option value="cancelled">キャンセル</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>検索（氏名・メール・備考）</label>
            <input
              type="text"
              className={styles.filterInput}
              placeholder="部分一致"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className={styles.mainContent}>
        {/* 一覧テーブル */}
        <section className={styles.tableSection}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>公演</th>
                  <th>回（日時）</th>
                  <th>氏名</th>
                  <th>メール</th>
                  <th>人数</th>
                  <th>ステータス</th>
                  <th>作成日時</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={styles.tableEmpty}>
                      該当する予約がありません
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((r) => {
                    const slot = slots.find((s) => s.id === r.slotId)
                    const perf = performances.find((p) => p.id === r.performanceId)
                    const isSelected = selectedId === r.id
                    return (
                      <tr
                        key={r.id}
                        className={isSelected ? styles.rowSelected : ''}
                        onClick={() => setSelectedId(r.id)}
                      >
                        <td>{perf ? perf.title : '—'}</td>
                        <td>{slot ? formatSlotDate(slot.date, slot.time) : '—'}</td>
                        <td>{r.name || '—'}</td>
                        <td>{r.email || '—'}</td>
                        <td>{r.people ?? '—'}</td>
                        <td>
                          <span
                            className={
                              r.status === 'cancelled' ? styles.badgeCancelled : styles.badgeActive
                            }
                          >
                            {r.status === 'cancelled' ? 'キャンセル' : '予約中'}
                          </span>
                        </td>
                        <td>{formatDateTime(r.createdAt)}</td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 詳細ペイン（右） */}
        {selected && (
          <aside className={styles.detailPane}>
            <div className={styles.detailPaneHeader}>
              <h2 className={styles.detailPaneTitle}>予約詳細</h2>
              <button
                type="button"
                className={styles.detailPaneClose}
                onClick={() => setSelectedId(null)}
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div className={styles.detailPaneBody}>
              <dl className={styles.detailList}>
                <dt>公演</dt>
                <dd>{selectedPerformance ? selectedPerformance.title : '—'}</dd>
                <dt>回（日付・時間）</dt>
                <dd>{selectedSlot ? formatSlotDate(selectedSlot.date, selectedSlot.time) : '—'}</dd>
                <dt>氏名</dt>
                <dd>{selected.name || '—'}</dd>
                <dt>メール</dt>
                <dd>{selected.email || '—'}</dd>
                <dt>人数</dt>
                <dd>{selected.people ?? '—'}</dd>
                <dt>備考（客）</dt>
                <dd>{selected.memo || '—'}</dd>
                <dt>作成日時</dt>
                <dd>{formatDateTime(selected.createdAt)}</dd>
                <dt>ステータス</dt>
                <dd>
                  <span
                    className={
                      selected.status === 'cancelled' ? styles.badgeCancelled : styles.badgeActive
                    }
                  >
                    {selected.status === 'cancelled' ? 'キャンセル' : '予約中'}
                  </span>
                </dd>
              </dl>
              <div className={styles.detailField}>
                <label className={styles.detailLabel} htmlFor="adminNote">
                  管理者メモ
                </label>
                <textarea
                  id="adminNote"
                  className={styles.detailTextarea}
                  rows={4}
                  value={selected.adminNote ?? ''}
                  onChange={(e) => handleAdminNoteChange(selected.id, e.target.value)}
                  placeholder="管理者用メモ（後から Firestore に保存）"
                />
              </div>
              {selected.status === 'active' && (
                <div className={styles.detailActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => handleCancelReservation(selected.id)}
                  >
                    キャンセルにする
                  </button>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export default ReservationsPage
