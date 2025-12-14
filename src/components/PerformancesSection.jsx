// PerformancesSectionコンポーネント
// 演目（公演一覧）セクション（カード形式のグリッドレイアウト）
// 将来、配列データやDBに差し替えやすい構造にする
import './PerformancesSection.css'

function PerformancesSection() {
  // 公演データ（仮データ、後で実際のデータに差し替え可能）
  // データ構造を変更しやすいように配列で定義
  const performances = [
    {
      id: 1,
      title: '月下の舞',
      date: '2025年4月15日〜20日',
      synopsis: '静寂の中に響く言葉の断片。月明かりに浮かぶ身体の軌跡が、時間を超えた物語を紡ぐ。',
      detailUrl: '#performance-1' // 詳細ページへのリンク（仮）
    },
    {
      id: 2,
      title: '風の記憶',
      date: '2025年6月10日〜15日',
      synopsis: '失われた記憶の断片を拾い集めながら、身体と声が織りなす瞬間の詩。',
      detailUrl: '#performance-2'
    },
    {
      id: 3,
      title: '沈黙の向こう',
      date: '2025年8月5日〜10日',
      synopsis: '言葉にならない想いが、空間に刻まれる。静寂と緊張のあわいに生まれる刹那の像。',
      detailUrl: '#performance-3'
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
              
              {/* 上演日時 */}
              <div className="card-date">
                {performance.date}
              </div>
              
              {/* 短い一文のあらすじ（抽象寄り） */}
              <p className="card-synopsis">{performance.synopsis}</p>
              
              {/* 「詳細を見る」リンク */}
              <a href={performance.detailUrl} className="card-link">
                詳細を見る
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PerformancesSection
