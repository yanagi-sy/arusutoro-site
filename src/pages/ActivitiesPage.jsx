/**
 * ActivitiesPageコンポーネント（活動一覧ページ）
 * 
 * 公演・イベント・ワークショップをまとめて表示するページです。
 * タグでフィルタリングでき、現在／予定の活動と過去の活動に分けて表示します。
 * 
 * 【主な機能】
 * - 活動の一覧表示
 * - タグによるフィルタリング（すべて / 公演 / イベント / 募集 / 外部）
 * - 現在／予定の活動と過去の活動の分類表示
 * - 外部リンクの表示（YouTube等）
 * 
 * 【データ構造】
 * - 現在は仮データ（配列）で管理
 * - 将来的にFirebaseなどのデータベースに差し替え可能な構造
 * 
 * 【状態管理】
 * - useState: 選択されたタグを管理（フィルタリング用）
 */

// ReactのuseStateフックをインポート（状態管理用）
import { useState } from 'react'
// ActivitiesPageコンポーネント用のスタイルを読み込み
import './ActivitiesPage.css'

/**
 * ActivitiesPageコンポーネント
 * 
 * @returns {JSX.Element} 活動一覧ページのJSX
 */
function ActivitiesPage() {
  /**
   * 選択されたタグの状態
   * 
   * useState: Reactのフック（状態を管理する機能）
   * 'すべて': 初期値（すべての活動を表示）
   * selectedTag: 現在選択されているタグ（読み取り専用）
   * setSelectedTag: タグを変更する関数
   * 
   * @type {[string, Function]}
   */
  const [selectedTag, setSelectedTag] = useState('すべて')

  /**
   * 活動データの配列
   * 
   * 現在は仮データとして配列で管理しています。
   * 将来的にFirebaseなどのデータベースから取得するように変更可能です。
   * 
   * @type {Array<Object>}
   * @property {number} id - 活動の一意のID
   * @property {string} date - 開始日（表示形式: YYYY.MM.DD）
   * @property {string} [endDate] - 終了日（オプション、期間がある場合のみ）
   * @property {string} title - タイトル
   * @property {string} tag - タグ（公演 / イベント / 募集 / 外部）
   * @property {string} description - 説明文
   * @property {string} status - 状態（'current': 現在／予定、'past': 過去）
   * @property {string} [externalLink] - 外部リンク（オプション、YouTube等）
   */
  const allActivities = [
    // 現在／予定の活動
    {
      id: 1,
      date: '2025.04.15',
      endDate: '2025.04.20',
      title: '新作公演「月下の舞」',
      tag: '公演',
      description: '静寂の中に響く言葉の断片。月明かりに浮かぶ身体の軌跡が、時間を超えた物語を紡ぐ。',
      status: 'current'
    },
    {
      id: 2,
      date: '2025.05.10',
      endDate: '2025.05.12',
      title: 'ワークショップ「身体と言葉」',
      tag: 'イベント',
      description: '身体表現とテキストの関係を探るワークショップ。',
      status: 'current'
    },
    {
      id: 3,
      date: '2025.06.01',
      title: 'メンバー募集',
      tag: '募集',
      description: '新メンバーを募集しています。詳細はお問い合わせページより。',
      status: 'current'
    },
    // 過去の活動
    {
      id: 4,
      date: '2024.12.10',
      endDate: '2024.12.15',
      title: '公演「風の記憶」',
      tag: '公演',
      description: '失われた記憶の断片を拾い集めながら、身体と声が織りなす瞬間の詩。',
      status: 'past'
    },
    {
      id: 5,
      date: '2024.10.05',
      endDate: '2024.10.10',
      title: '公演「沈黙の向こう」',
      tag: '公演',
      description: '言葉にならない想いが、空間に刻まれる。静寂と緊張のあわいに生まれる刹那の像。',
      status: 'past'
    },
    {
      id: 6,
      date: '2024.08.20',
      title: '外部イベント参加',
      tag: '外部',
      description: '他劇団との合同公演に参加いたしました。',
      status: 'past',
      externalLink: 'https://example.com' // 外部リンク（YouTube等、後から差し替え可能）
    },
    {
      id: 7,
      date: '2024.07.15',
      title: 'ワークショップ「即興と構造」',
      tag: 'イベント',
      description: '即興表現と構造的な構成の関係を探るワークショップを開催しました。',
      status: 'past'
    }
  ]

  /**
   * 利用可能なタグの配列を取得
   * 
   * 'すべて'を先頭に追加し、allActivitiesから重複を除いたタグのリストを作成
   * new Set(): 重複を除去するためのSetオブジェクト
   * ...: スプレッド演算子（配列に展開）
   * 
   * @type {Array<string>}
   */
  const availableTags = ['すべて', ...new Set(allActivities.map(item => item.tag))]

  /**
   * フィルタリングされた活動の配列
   * 
   * selectedTagが'すべて'の場合は全活動を表示、
   * それ以外の場合は選択されたタグに一致する活動のみを表示
   * 
   * @type {Array<Object>}
   */
  const filteredActivities = selectedTag === 'すべて'
    ? allActivities
    : allActivities.filter(item => item.tag === selectedTag)

  /**
   * 現在／予定の活動の配列
   * 
   * statusが'current'の活動のみを抽出
   * 
   * @type {Array<Object>}
   */
  const currentActivities = filteredActivities.filter(item => item.status === 'current')
  
  /**
   * 過去の活動の配列
   * 
   * statusが'past'の活動のみを抽出
   * 
   * @type {Array<Object>}
   */
  const pastActivities = filteredActivities.filter(item => item.status === 'past')

  return (
    <div className="activities-page">
      {/* ページヘッダー */}
      <div className="activities-header">
        <h1 className="activities-page-title">活動一覧</h1>
        <p className="activities-page-subtitle">公演・イベント・ワークショップ</p>
      </div>

      {/* タグフィルター（活動をタグで絞り込む） */}
      <div className="activities-filters">
        {/* 
          mapメソッド: availableTags配列の各タグを順番に処理して、
          フィルターボタンのJSXを生成
        */}
        {availableTags.map((tag) => (
          <button
            key={tag}
            // 条件付きクラス名: 選択されているタグの場合は'active'クラスを追加
            className={`activities-filter-btn ${selectedTag === tag ? 'active' : ''}`}
            // onClick: ボタンクリック時に選択されたタグを更新
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 
        現在／予定の活動セクション
        currentActivities.length > 0: 現在／予定の活動がある場合のみ表示
        &&: 論理AND演算子（左側がtrueの場合のみ右側を評価）
      */}
      {currentActivities.length > 0 && (
        <section className="activities-section">
          <h2 className="activities-section-title">現在／予定の活動</h2>
          <div className="activities-list">
            {/* 
              mapメソッド: currentActivities配列の各活動を順番に処理して、
              活動カードのJSXを生成
            */}
            {currentActivities.map((activity) => (
              <div key={activity.id} className="activity-card">
                {/* 日付（終了日がある場合は期間表示） */}
                <div className="activity-date">
                  {/* 三項演算子: endDateがある場合は期間表示、ない場合は開始日のみ */}
                  {activity.endDate ? `${activity.date} 〜 ${activity.endDate}` : activity.date}
                </div>
                {/* 活動ヘッダー（タグとタイトル） */}
                <div className="activity-header">
                  <span className="activity-tag">{activity.tag}</span>
                  <h3 className="activity-title">{activity.title}</h3>
                </div>
                {/* 説明文 */}
                <p className="activity-description">{activity.description}</p>
                {/* 
                  外部リンク: externalLinkがある場合のみ表示
                  &&: 論理AND演算子（左側がtrueの場合のみ右側を評価）
                */}
                {activity.externalLink && (
                  <div className="activity-external-link">
                    <a 
                      href={activity.externalLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="activity-external-link-btn"
                    >
                      詳細を見る →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 過去の活動 */}
      {pastActivities.length > 0 && (
        <section className="activities-section">
          <h2 className="activities-section-title">過去の活動</h2>
          <div className="activities-list">
            {pastActivities.map((activity) => (
              <div key={activity.id} className="activity-card activity-card-past">
                <div className="activity-date">
                  {activity.endDate ? `${activity.date} 〜 ${activity.endDate}` : activity.date}
                </div>
                <div className="activity-header">
                  <span className="activity-tag">{activity.tag}</span>
                  <h3 className="activity-title">{activity.title}</h3>
                </div>
                <p className="activity-description">{activity.description}</p>
                {/* 外部リンクがある場合は表示 */}
                {activity.externalLink && (
                  <div className="activity-external-link">
                    <a 
                      href={activity.externalLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="activity-external-link-btn"
                    >
                      詳細を見る →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 
        活動がない場合のメッセージ
        filteredActivities.length === 0: フィルタリング結果が0件の場合のみ表示
      */}
      {filteredActivities.length === 0 && (
        <div className="activities-empty">
          <p>該当する活動がありません。</p>
        </div>
      )}
    </div>
  )
}

// ActivitiesPageコンポーネントを他のファイルで使用できるようにエクスポート
export default ActivitiesPage

