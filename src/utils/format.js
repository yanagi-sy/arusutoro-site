/**
 * 日付・文字列のフォーマット用ユーティリティ
 *
 * 表示用のフォーマット処理を集約し、ページ間の重複を避けます。
 */

const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土']

/**
 * 日付文字列を「○月○日（曜日）」形式でフォーマットする
 *
 * @param {string} dateString - 日付文字列（YYYY-MM-DD 形式）
 * @returns {string} フォーマットされた日付文字列（例: 4月15日（火））
 */
export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = WEEKDAYS_JA[date.getDay()]
  return `${month}月${day}日（${weekday}）`
}
