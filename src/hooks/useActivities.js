/**
 * 公演・イベント一覧取得用フック
 *
 * 活動一覧の取得責務をコンポーネントから分離します。
 */

import { useMemo } from 'react'
import { getAllActivities } from '../services/activityService'

/**
 * 公演・イベント一覧を取得する
 *
 * @param {Object} options - オプション
 * @param {string} [options.status] - このステータスのものだけに絞る（'active' など）
 * @returns {Array<Object>} 活動データの配列
 */
export function useActivities(options = {}) {
  const { status } = options

  return useMemo(() => {
    const list = getAllActivities()
    if (status) {
      return list.filter((a) => a.status === status)
    }
    return list
  }, [status])
}
