/**
 * AboutPageコンポーネント（劇団紹介ページ）
 * 
 * 劇団についての紹介文を表示するページです。
 * 
 * 【主な機能】
 * - 劇団紹介テキストの表示
 * - 和紙のような背景デザイン
 * 
 * 【データ構造】
 * - 現在は配列でテキストを管理
 * - 将来的にFirebaseなどのデータベースに差し替え可能な構造
 */

// AboutPageコンポーネント用のスタイルを読み込み
import './AboutPage.css'

/**
 * AboutPageコンポーネント
 * 
 * @returns {JSX.Element} 劇団紹介ページのJSX
 */
function AboutPage() {
  /**
   * 劇団紹介のテキスト配列
   * 
   * 各行を配列の要素として管理しています。
   * 空文字列の要素は改行として扱われます。
   * 
   * @type {Array<string>}
   */
  const aboutText = [
    '劇團 或素翔鷺は、',
    '言葉と身体、沈黙と緊張のあわいに',
    '刹那の像を立ち上げるために集った劇団である。',
    '',
    '私たちは、日常の隙間から生まれる',
    '言葉にならない想いを、',
    '身体と声の表現によって',
    '舞台の上に立ち上げることを目指している。',
    '',
    '花鳥風月、刹那の夢を描く。',
    'それが私たちの活動の根幹である。'
  ]

  return (
    <div className="about-page">
      {/* ページヘッダー（ページタイトル） */}
      <div className="about-header">
        <h1 className="about-page-title">劇団について</h1>
      </div>

      {/* 劇団紹介コンテンツ */}
      <div className="about-content">
        <div className="about-text-container">
          {/* 
            mapメソッド: aboutText配列の各要素（各行）を順番に処理して、
            <p>要素のJSXを生成
            key={index}: Reactのリストレンダリングで必要な一意のキー
          */}
          {aboutText.map((line, index) => (
            <p key={index} className="about-text-line">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

// AboutPageコンポーネントを他のファイルで使用できるようにエクスポート
export default AboutPage

