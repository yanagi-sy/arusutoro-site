/**
 * お知らせ一覧取得用フック
 *
 * お知らせデータの取得責務をコンポーネントから分離します。
 */

import { useMemo } from 'react'
import { getAllNews } from '../services/newsService'

/**
 * お知らせ一覧を取得する
 *
 * @returns {Array<Object>} お知らせデータの配列
 */
export function useNews() {
  return useMemo(() => getAllNews(), [])
}
