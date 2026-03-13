/**
 * 公演・イベント 1 件取得用フック
 *
 * URL パラメータや ID に基づいて活動データを取得します。
 * データ取得責務をページコンポーネントから分離します。
 */

import { useMemo } from 'react'
import { getActivityById } from '../services/activityService'

/**
 * 指定 ID の公演・イベントを取得する
 *
 * @param {string|number|null} activityId - 活動 ID（null の場合は何も返さない）
 * @returns {{ activity: Object|undefined, notFound: boolean }}
 */
export function useActivity(activityId) {
  const activity = useMemo(() => {
    if (activityId == null || activityId === '') return undefined
    return getActivityById(activityId)
  }, [activityId])

  const notFound = activityId != null && activityId !== '' && activity == null

  return {
    activity: activity ?? undefined,
    notFound
  }
}
