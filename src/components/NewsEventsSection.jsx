/**
 * NewsEventsSectionコンポーネント（お知らせセクション）
 * 
 * トップページに表示されるお知らせ・ニュースセクションです。
 * 掲示板形式（シンプルなテキスト）で、日付・種別・タイトルのみを表示します。
 * 
 * 【主な機能】
 * - お知らせ・ニュースの一覧表示
 * - 日付・種別・タイトルのみ表示（装飾は最小限）
 * 
 * 【データ構造】
 * - 現在は仮データ（配列）で管理
 * - 将来的にFirebaseなどのデータベースに差し替え可能な構造
 * 
 * 【デザイン】
 * - 掲示板形式（シンプルなテキスト）
 * - 装飾は最小限
 */

// react-router-domのLinkコンポーネントをインポート
import { Link } from 'react-router-dom'
// NewsEventsSectionコンポーネント用のスタイルを読み込み
import './NewsEventsSection.css'

/**
 * NewsEventsSectionコンポーネント
 * 
 * @returns {JSX.Element} お知らせセクションのJSX
 */
function NewsEventsSection() {
  /**
   * ニュース・イベントデータの配列
   * 
   * 現在は仮データとして配列で管理しています。
   * 将来的にFirebaseなどのデータベースから取得するように変更可能です。
   * 
   * @type {Array<Object>}
   * @property {number} id - お知らせの一意のID
   * @property {string} date - 日付（表示形式: YYYY.MM.DD）
   * @property {string} title - タイトル
   * @property {string} tag - 種別（公演 / イベント / 募集 / 外部）
   * @property {string} link - リンク先のURLパス
   */
  const newsEvents = [
    {
      id: 1,
      date: '2025.04.01',
      title: '新作公演「月下の舞」上演決定',
      tag: '公演',
      link: '/activities'
    },
    {
      id: 2,
      date: '2025.03.20',
      title: 'ワークショップ「身体と言葉」開催',
      tag: 'イベント',
      link: '/activities'
    },
    {
      id: 3,
      date: '2025.03.10',
      title: 'メンバー募集のお知らせ',
      tag: '募集',
      link: '/contact'
    },
    {
      id: 4,
      date: '2025.02.28',
      title: '外部イベント参加のお知らせ',
      tag: '外部',
      link: '/activities'
    }
  ]

  return (
    // section要素: セクションを意味するHTMLセマンティック要素
    <section className="news-events">
      {/* news-events-container: セクションの内容を中央に配置するコンテナ */}
      <div className="news-events-container">
        {/* 「NEWS」テキスト（見出しの上部） */}
        <div className="news-events-label">NEWS</div>
        
        {/* セクション見出し */}
        <h2 className="news-events-title">お知らせ</h2>
        
        {/* ニュース・イベントリスト（掲示板形式、シンプルなテキスト） */}
        <div className="news-events-list">
          {/* 
            mapメソッド: newsEvents配列の各要素を順番に処理して、お知らせ項目のJSXを生成
            index: 配列のインデックス（区切り線の表示判定に使用）
          */}
          {newsEvents.map((item, index) => (
            <div key={item.id}>
              {/* 
                Linkコンポーネント: お知らせ項目へのリンク
              */}
              <Link 
                to={item.link} 
                className="news-events-item"
              >
                {/* 日付 */}
                <span className="news-events-date">{item.date}</span>
                
                {/* 種別 */}
                <span className="news-events-tag">{item.tag}</span>
                
                {/* タイトル */}
                <span className="news-events-item-title">{item.title}</span>
              </Link>
              
              {/* 
                区切り線: 最後の項目以外の後に表示
                index < newsEvents.length - 1: 配列の最後の要素以外の場合のみ表示
              */}
              {index < newsEvents.length - 1 && (
                <div className="news-events-divider"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// NewsEventsSectionコンポーネントを他のファイルで使用できるようにエクスポート
export default NewsEventsSection
