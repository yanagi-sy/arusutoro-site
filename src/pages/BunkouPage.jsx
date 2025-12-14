/**
 * BunkouPageコンポーネント（文抗時代ページ）
 * 
 * 文抗時代についての説明を表示するページです。
 * 文抗時代は、劇團 或素翔鷺の主宰による同人文学活動です。
 * 
 * 【主な機能】
 * - 文抗時代の説明テキストの表示
 * - 外部リンクの準備中表示
 * 
 * 【データ構造】
 * - 現在は配列でテキストを管理
 * - 将来的にFirebaseなどのデータベースに差し替え可能な構造
 */

// BunkouPageコンポーネント用のスタイルを読み込み
import './BunkouPage.css'

/**
 * BunkouPageコンポーネント
 * 
 * @returns {JSX.Element} 文抗時代ページのJSX
 */
function BunkouPage() {
  /**
   * 文抗時代の説明テキスト配列
   * 
   * 各行を配列の要素として管理しています。
   * 空文字列の要素は改行として扱われます。
   * 
   * @type {Array<string>}
   */
  const bunkouText = [
    '文抗時代は、',
    '劇團 或素翔鷺の主宰による',
    '同人文学作品の集まりである。',
    '',
    '劇団本体の活動とは別に、',
    '言葉とテキストの可能性を',
    '探求する場として',
    '継続的に活動している。',
    '',
    '詳細は後日公開予定です。'
  ]

  return (
    <div className="bunkou-page">
      {/* ページヘッダー（ページタイトルとサブタイトル） */}
      <div className="bunkou-header">
        <h1 className="bunkou-page-title">文抗時代</h1>
        <p className="bunkou-page-subtitle">主宰による同人文学活動</p>
      </div>

      {/* 文抗時代の説明コンテンツ */}
      <div className="bunkou-content">
        <div className="bunkou-text-container">
          {/* 
            mapメソッド: bunkouText配列の各要素（各行）を順番に処理して、
            <p>要素のJSXを生成
            key={index}: Reactのリストレンダリングで必要な一意のキー
          */}
          {bunkouText.map((line, index) => (
            <p key={index} className="bunkou-text-line">
              {line}
            </p>
          ))}
        </div>

        {/* 外部リンクセクション（準備中表示） */}
        <div className="bunkou-links">
          <p className="bunkou-links-note">
            外部リンクは準備中です。
          </p>
        </div>
      </div>
    </div>
  )
}

// BunkouPageコンポーネントを他のファイルで使用できるようにエクスポート
export default BunkouPage

