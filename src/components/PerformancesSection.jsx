// PerformancesSectionコンポーネント
// 公演一覧セクション（カード形式のグリッドレイアウト）
import './PerformancesSection.css'

function PerformancesSection() {
  // 仮データ（後で実際のデータに差し替え可能）
  // データ構造を変更しやすいように配列で定義
  const performances = [
    {
      id: 1,
      title: '仮公演タイトル 1',
      date: '2025年4月15日',
      venue: '東京劇場',
      description: 'これは仮の公演情報です。後で実際の公演データに差し替えます。説明文は複数行にわたっても問題なく表示されます。'
    },
    {
      id: 2,
      title: '仮公演タイトル 2',
      date: '2025年5月20日',
      venue: '大阪劇場',
      description: '公演の詳細情報がここに表示されます。カード形式で見やすく整理されています。'
    },
    {
      id: 3,
      title: '仮公演タイトル 3',
      date: '2025年6月10日',
      venue: '京都劇場',
      description: 'このセクションはグリッドレイアウトで表示され、レスポンシブ対応になっています。'
    }
  ]

  return (
    <section className="performances">
      {/* セクション全体のコンテナ */}
      <div className="performances-container">
        {/* セクション見出し */}
        <h2 className="performances-title">演目 - Performances -</h2>
        
        {/* 公演カードのグリッド */}
        <div className="performances-grid">
          {/* mapを使ってカードを生成 */}
          {performances.map((performance) => (
            <div key={performance.id} className="performance-card">
              {/* 公演タイトル */}
              <h3 className="card-title">{performance.title}</h3>
              
              {/* 日時 */}
              <div className="card-info">
                <span className="card-label">日時：</span>
                <span className="card-value">{performance.date}</span>
              </div>
              
              {/* 会場 */}
              <div className="card-info">
                <span className="card-label">会場：</span>
                <span className="card-value">{performance.venue}</span>
              </div>
              
              {/* 説明文 */}
              <p className="card-description">{performance.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PerformancesSection

