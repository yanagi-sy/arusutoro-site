/**
 * BunkouSectionコンポーネント（文抗時代セクション）
 * 
 * トップページの下部（フッター直前）に表示される、
 * 文抗時代（主宰による同人文学活動）の紹介セクションです。
 * 
 * 【主な機能】
 * - ポラロイド風の画像2枚を表示（アルバムに貼り付けた感じ）
 * - 文抗時代の紹介文の表示
 * - 外部SNSリンク（X）の表示
 * - 外部活動であることが分かる控えめなデザイン
 * 
 * 【デザイン方針】
 * - 主張しすぎない
 * - ポラロイド風の自然な配置（少し回転、少し重なり）
 * - 落ち着いたトーン
 * - 外部活動であることが分かる配置
 */

// BunkouSectionコンポーネント用のスタイルを読み込み
import './BunkouSection.css'

/**
 * BunkouSectionコンポーネント
 * 
 * @returns {JSX.Element} 文抗時代セクションのJSX
 */
function BunkouSection() {
  /**
   * 画像データの配列
   * 
   * 各画像のURLと、ポラロイド風レイアウト用のクラス名を定義しています。
   * 
   * @type {Array<Object>}
   * @property {number} id - 画像の一意のID
   * @property {string} url - 画像のURL
   * @property {string} className - 画像用のクラス名（回転や位置調整用）
   * @property {string} alt - 画像の代替テキスト（アクセシビリティ用）
   */
  const images = [
    {
      id: 1,
      url: 'https://raw.githubusercontent.com/yanagi-sy/arusutoro-site/main/src/assets/images/bunkoujidai-1.png',
      className: 'bunkou-photo bunkou-photo-1',
      alt: '文抗時代 画像1'
    },
    {
      id: 2,
      url: 'https://raw.githubusercontent.com/yanagi-sy/arusutoro-site/main/src/assets/images/bunkoujidai-2.png',
      className: 'bunkou-photo bunkou-photo-2',
      alt: '文抗時代 画像2'
    }
  ]

  return (
    // section要素: セクションを意味するHTMLセマンティック要素
    <section className="bunkou-section">
      {/* bunkou-section-container: セクション全体を囲む枠線付きコンテナ */}
      <div className="bunkou-section-container">
        {/* セクション見出し（最上部） */}
        <div className="bunkou-section-header">
          {/* メイン見出し（日本語、全角の鉤括弧つき） */}
          <h2 className="bunkou-section-title">「文抗時代」</h2>
        </div>

        {/* bunkou-section-inner: 横並びレイアウトの内側コンテナ（左：画像、右：テキスト） */}
        <div className="bunkou-section-inner">
          {/* 左側：画像セクション（ポラロイド風アルバム） */}
          <div className="bunkou-section-photos">
            {/* 
              mapメソッド: images配列の各要素を順番に処理して、画像のJSXを生成
              ポラロイド風の白い枠付きで画像を表示
              アルバムに写真を貼り付けたような自然なレイアウト
            */}
            {images.map((image) => (
              <div key={image.id} className={image.className}>
                {/* 
                  img要素: 画像を表示
                  src属性: 画像のURL（RAW URL）
                  alt属性: 画像が表示できない場合やスクリーンリーダー用の説明文
                  className: 画像本体のスタイル用クラス
                */}
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="bunkou-photo-img"
                />
              </div>
            ))}
          </div>

          {/* 右側：テキストコンテンツセクション */}
          <div className="bunkou-section-text-content">
            {/* 説明文セクション */}
            <div className="bunkou-section-content">
              {/* 紹介文の各段落 */}
              <p className="bunkou-section-text">
                文抗時代は劇團 或素翔鷺の演出陣が中心となって編纂した文芸誌です。
              </p>
              <p className="bunkou-section-text">
                時代の流れに囚われぬ詩的表現を是非ともご拝読ください。
              </p>
            </div>

            {/* 区切り線（説明文とSNSリンクの間） */}
            <hr className="bunkou-section-divider" />

            {/* SNSリンクセクション */}
            <div className="bunkou-section-links">
              {/* X（旧Twitter）へのリンク */}
              <a 
                href="https://x.com/bunkoujidai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bunkou-section-link"
                aria-label="文抗時代　X公式アカウントはこちらへ"
              >
                文抗時代　X公式アカウントはこちらへ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// BunkouSectionコンポーネントを他のファイルで使用できるようにエクスポート
export default BunkouSection

