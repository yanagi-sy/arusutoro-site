/**
 * NotFoundMessage（見つからない場合のメッセージ表示）
 *
 * 公演が見つからない・予約情報がない場合など、エラー表示を共通化します。
 */

import styles from './NotFoundMessage.module.css'

/**
 * @param {Object} props
 * @param {string} props.title - 見出し
 * @param {string} props.description - 説明文
 * @param {string} props.backLabel - 戻るボタンのラベル
 * @param {() => void} props.onBack - 戻るボタンのクリックハンドラ
 */
function NotFoundMessage({ title, description, backLabel, onBack }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <button type="button" className={styles.backButton} onClick={onBack}>
        {backLabel}
      </button>
    </div>
  )
}

export default NotFoundMessage
