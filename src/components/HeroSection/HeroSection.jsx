/**
 * HeroSectionコンポーネント（ヒーローセクション）
 * 
 * トップページの最初に表示される大きなセクションです。
 * 背景画像の上に、縦書きの劇団名とキャッチコピーを重ねて表示します。
 * 
 * 【主な機能】
 * - 背景画像の全画面表示
 * - 縦書きの劇団名表示（writing-mode: vertical-rl）
 * - ローマ字表記の表示
 * - キャッチコピーの表示
 * - フェードインアニメーション（初回表示時のみ）
 * 
 * 【デザイン】
 * - 背景: 和紙のような淡い背景画像
 * - 文字: 墨色（暗い色）
 * - 配置: 画面左寄り（背景のモチーフに被らない位置）
 */

// HeroSectionコンポーネント用のスタイルを読み込み
import styles from './HeroSection.module.css'
// Reactのフックをインポート（レスポンシブ対応用）
import { useState, useEffect } from 'react'

/**
 * HeroSectionコンポーネント
 * 
 * @returns {JSX.Element} ヒーローセクションのJSX
 */
function HeroSection() {
  /**
   * 背景画像のURL
   * 
   * 後から実際の画像URLに差し替え可能です。
   * ローカルファイルを使用する場合は、相対パスで指定してください。
   * 例: '/src/assets/images/header.jpg'
   * 
   * @type {string}
   */
  const backgroundImageUrl = 'https://raw.githubusercontent.com/yanagi-sy/arusutoro-site/main/src/assets/images/ChatGPT%20Image%202025%E5%B9%B412%E6%9C%8813%E6%97%A5%2020_31_20.png'

  // ============================================
  // 背景画像の位置とサイズの設定（手動で数値を変更できます）
  // ============================================
  
  // モバイル画面（768px以下）の設定
  const MOBILE_BACKGROUND_POSITION_X = 40  // X軸の位置（%）: 0-100の値で指定
  const MOBILE_BACKGROUND_POSITION_Y = 65  // Y軸の位置（%）: 0-100の値で指定
  const MOBILE_BACKGROUND_SIZE_WIDTH = 300// 画像サイズの幅（%）: 100以上を推奨（cover より大きくすると位置指定が効きやすくなります）
  const MOBILE_BACKGROUND_SIZE_HEIGHT = 'auto' // 画像サイズの高さ: 'auto' または数値（%）

  // デスクトップ画面（769px以上）の設定
  const DESKTOP_BACKGROUND_POSITION = 'center' // 位置: 'center', 'top', 'bottom', 'left', 'right' または 'X% Y%' 形式
  const DESKTOP_BACKGROUND_SIZE = 'cover'      // サイズ: 'cover', 'contain', 'auto' または 'X% Y%' 形式

  // ============================================

  // レスポンシブ対応: ウィンドウサイズに応じて背景画像の位置とサイズを変更
  const [backgroundPosition, setBackgroundPosition] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return `${MOBILE_BACKGROUND_POSITION_X}% ${MOBILE_BACKGROUND_POSITION_Y}%`
    }
    return DESKTOP_BACKGROUND_POSITION
  })
  const [backgroundSize, setBackgroundSize] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return MOBILE_BACKGROUND_SIZE_HEIGHT === 'auto'
        ? `${MOBILE_BACKGROUND_SIZE_WIDTH}% auto`
        : `${MOBILE_BACKGROUND_SIZE_WIDTH}% ${MOBILE_BACKGROUND_SIZE_HEIGHT}%`
    }
    return DESKTOP_BACKGROUND_SIZE
  })

  useEffect(() => {
    /**
     * ウィンドウサイズに応じて背景画像の位置とサイズを設定
     */
    const updateBackgroundStyle = () => {
      const width = window.innerWidth
      if (width <= 768) {
        // モバイル設定
        setBackgroundPosition(`${MOBILE_BACKGROUND_POSITION_X}% ${MOBILE_BACKGROUND_POSITION_Y}%`)
        setBackgroundSize(
          MOBILE_BACKGROUND_SIZE_HEIGHT === 'auto'
            ? `${MOBILE_BACKGROUND_SIZE_WIDTH}% auto`
            : `${MOBILE_BACKGROUND_SIZE_WIDTH}% ${MOBILE_BACKGROUND_SIZE_HEIGHT}%`
        )
      } else {
        // デスクトップ設定
        setBackgroundPosition(DESKTOP_BACKGROUND_POSITION)
        setBackgroundSize(DESKTOP_BACKGROUND_SIZE)
      }
    }

    // 初回実行
    updateBackgroundStyle()

    // リサイズイベントリスナーを追加
    window.addEventListener('resize', updateBackgroundStyle)

    // クリーンアップ: コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      window.removeEventListener('resize', updateBackgroundStyle)
    }
  }, [])

  // スタイルオブジェクトを構築
  const inlineStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: backgroundPosition,
    backgroundSize: backgroundSize,
    backgroundRepeat: 'no-repeat',
  }

  return (
    // section要素: セクションを意味するHTMLセマンティック要素
    <section
      className={styles.hero}
      // style属性: インラインスタイルで背景画像と背景位置を直接設定
      style={inlineStyle}
    >
      {/* hero-content: テキストコンテンツを配置するコンテナ */}
      <div className={styles.heroContent}>
        {/* 縦書きの劇団名（メインタイトル、大きく表示） */}
        <h1 className={styles.heroTitleVertical}>劇團 或素翔鷺</h1>
        
        {/* ローマ字表記（横書き、控えめに配置） */}
        <p className={styles.heroSubtitleRoman}>Gekidan Alstro</p>
        
        {/* キャッチコピー（控えめに表示、世界観を補足する位置づけ） */}
        <p className={styles.heroCatchphrase}>花鳥風月、刹那の夢を描く。</p>
      </div>
    </section>
  )
}

// HeroSectionコンポーネントを他のファイルで使用できるようにエクスポート
export default HeroSection

