/**
 * 予約管理用ダミーデータ（Firestore 想定構造）
 *
 * 後から Firestore に差し替える前提の構造です。
 * Firebase 接続・fetch は行いません。
 */

/** 公演（予約管理で参照する最小構成） */
export const performances = [
  { id: 'perf-1', title: '新作公演「月下の舞」' },
  { id: 'perf-2', title: '公演「風の記憶」再演' },
  { id: 'perf-3', title: 'イベント「身体と言葉のあわい」' },
  { id: 'perf-4', title: '公演「過去の記憶」' }
]

/** 開催回（スロット）：id, performanceId, date, time, capacity */
export const slots = [
  { id: 'slot-1-1', performanceId: 'perf-1', date: '2025-04-15', time: '19:00', capacity: 100 },
  { id: 'slot-1-2', performanceId: 'perf-1', date: '2025-04-16', time: '14:00', capacity: 100 },
  { id: 'slot-1-3', performanceId: 'perf-1', date: '2025-04-16', time: '19:00', capacity: 100 },
  { id: 'slot-1-4', performanceId: 'perf-1', date: '2025-04-17', time: '19:00', capacity: 100 },
  { id: 'slot-2-1', performanceId: 'perf-2', date: '2025-06-10', time: '19:00', capacity: 50 },
  { id: 'slot-2-2', performanceId: 'perf-2', date: '2025-06-11', time: '19:00', capacity: 50 },
  { id: 'slot-3-1', performanceId: 'perf-3', date: '2025-07-05', time: '14:00', capacity: 30 }
]

/** 予約一覧 */
export const reservations = [
  {
    id: 'res-1',
    performanceId: 'perf-1',
    slotId: 'slot-1-1',
    name: '山田 太郎',
    email: 'yamada@example.com',
    people: 2,
    memo: '',
    adminNote: '初回予約',
    status: 'active',
    createdAt: '2025-03-10T14:00:00'
  },
  {
    id: 'res-2',
    performanceId: 'perf-1',
    slotId: 'slot-1-1',
    name: '佐藤 花子',
    email: 'sato@example.com',
    people: 4,
    memo: '車椅子1名',
    adminNote: '',
    status: 'active',
    createdAt: '2025-03-11T09:30:00'
  },
  {
    id: 'res-3',
    performanceId: 'perf-1',
    slotId: 'slot-1-1',
    name: '鈴木 一郎',
    email: 'suzuki@example.com',
    people: 1,
    memo: '',
    adminNote: 'キャンセル希望で連絡あり',
    status: 'cancelled',
    createdAt: '2025-03-12T11:00:00'
  },
  {
    id: 'res-4',
    performanceId: 'perf-1',
    slotId: 'slot-1-2',
    name: '田村 美咲',
    email: 'tamura@example.com',
    people: 2,
    memo: '',
    adminNote: '',
    status: 'active',
    createdAt: '2025-03-15T16:00:00'
  },
  {
    id: 'res-5',
    performanceId: 'perf-1',
    slotId: 'slot-1-3',
    name: '高橋 健太',
    email: 'takahashi@example.com',
    people: 3,
    memo: '子供2名',
    adminNote: '',
    status: 'active',
    createdAt: '2025-03-18T10:00:00'
  },
  {
    id: 'res-6',
    performanceId: 'perf-1',
    slotId: 'slot-1-3',
    name: '伊藤 恵子',
    email: 'ito@example.com',
    people: 1,
    memo: '',
    adminNote: '',
    status: 'active',
    createdAt: '2025-03-20T08:00:00'
  },
  {
    id: 'res-7',
    performanceId: 'perf-3',
    slotId: 'slot-3-1',
    name: '渡辺 直樹',
    email: 'watanabe@example.com',
    people: 2,
    memo: 'ワークショップ参加希望',
    adminNote: '前日リマインド',
    status: 'active',
    createdAt: '2025-04-01T12:00:00'
  },
  {
    id: 'res-8',
    performanceId: 'perf-3',
    slotId: 'slot-3-1',
    name: '中村 真理',
    email: 'nakamura@example.com',
    people: 1,
    memo: '',
    adminNote: '',
    status: 'cancelled',
    createdAt: '2025-04-02T09:00:00'
  }
]

/**
 * スロットごとの予約人数合計（active のみ）を計算する
 * @param {Array} resList - 予約配列
 * @returns {Object} slotId -> 人数合計
 */
export function getReservedCountBySlot(resList) {
  const count = {}
  resList.forEach((r) => {
    if (r.status !== 'active') return
    count[r.slotId] = (count[r.slotId] || 0) + (Number(r.people) || 1)
  })
  return count
}
