/**
 * 公演・イベントデータの取得サービス
 *
 * データソース（現状は data/activities）へのアクセスを集約します。
 * 後から Firebase/Firestore に差し替える場合はこのファイルのみ修正します。
 */

import { getActivityById as getActivityFromData, getAllActivities as getAllActivitiesFromData } from '../data/activities'

/**
 * ID で公演・イベントを 1 件取得する
 *
 * @param {string|number} id - 活動 ID
 * @returns {Object|undefined} 活動データ。存在しない場合は undefined
 */
export function getActivityById(id) {
  return getActivityFromData(id)
}

/**
 * 公演・イベントの一覧を取得する
 *
 * @returns {Array<Object>} 活動データの配列
 */
export function getAllActivities() {
  return getAllActivitiesFromData()
}
