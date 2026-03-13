/**
 * お知らせデータの取得サービス
 *
 * データソース（現状は data/news）へのアクセスを集約します。
 * 後から Firebase/Firestore に差し替える場合はこのファイルのみ修正します。
 */

import { getAllNews as getAllNewsFromData } from '../data/news'

/**
 * お知らせ一覧を取得する
 *
 * @returns {Array<Object>} お知らせデータの配列
 */
export function getAllNews() {
  return getAllNewsFromData()
}
