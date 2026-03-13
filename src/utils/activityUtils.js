/**
 * 公演・イベント関連の計算・判定ユーティリティ
 *
 * ビジネスロジックを集約し、コンポーネントから分離します。
 */

/**
 * 開催回の残り席数を計算する
 *
 * @param {Object} performance - 開催回データ（capacity, reserved を持つ）
 * @returns {number} 残り席数
 */
export function getRemainingSeats(performance) {
  if (!performance || typeof performance.capacity !== 'number' || typeof performance.reserved !== 'number') {
    return 0
  }
  return Math.max(0, performance.capacity - performance.reserved)
}

/**
 * 開催回が満席かどうかを判定する
 *
 * @param {Object} performance - 開催回データ
 * @returns {boolean}
 */
export function isSoldOut(performance) {
  return getRemainingSeats(performance) <= 0
}
