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
import './HeroSection.css'

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

  return (
    // section要素: セクションを意味するHTMLセマンティック要素
    <section
      className="hero"
      // style属性: インラインスタイルで背景画像を設定
      // backgroundImage: CSSのbackground-imageプロパティを設定
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      {/* hero-content: テキストコンテンツを配置するコンテナ */}
      <div className="hero-content">
        {/* 縦書きの劇団名（メインタイトル、大きく表示） */}
        <h1 className="hero-title-vertical">劇團 或素翔鷺</h1>
        
        {/* ローマ字表記（横書き、控えめに配置） */}
        <p className="hero-subtitle-roman">Gekidan Alstro</p>
        
        {/* キャッチコピー（控えめに表示、世界観を補足する位置づけ） */}
        <p className="hero-catchphrase">花鳥風月、刹那の夢を描く。</p>
      </div>
    </section>
  )
}

// HeroSectionコンポーネントを他のファイルで使用できるようにエクスポート
export default HeroSection
