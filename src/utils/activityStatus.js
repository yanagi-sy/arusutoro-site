/**
 * 公演・イベントのステータス表示用ユーティリティ
 *
 * 一般ページ用のステータスバッジ情報を返します。
 */

/**
 * ステータスに応じたバッジのテキストとクラス名を取得する
 *
 * @param {string} status - ステータス（'active' | 'coming_soon' | 'ended'）
 * @returns {{ text: string, className: string } | null} バッジ情報。active の場合は null
 */
export function getStatusBadge(status) {
  switch (status) {
    case 'coming_soon':
      return { text: 'Coming Soon', className: 'activity-status-badge coming-soon' }
    case 'ended':
      return { text: '終了', className: 'activity-status-badge ended' }
    case 'active':
    default:
      return null
  }
}
