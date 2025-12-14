/**
 * Footerコンポーネント（フッター）
 * 
 * 全ページ共通で使用されるフッターです。
 * ヘッダーと反転したデザイン（白背景・暗い文字色）で表示されます。
 * 
 * 【表示内容】
 * - 劇団名（日本語）とローマ字表記（左揃え）
 * - SNSリンク（中央揃え）
 * - コピーライト（右揃え）
 * 
 * 【レイアウト】
 * - 横並びレイアウト（左・中央・右に配置）
 * - モバイル表示時は縦並びに自動切り替え
 */

// Footerコンポーネント用のスタイルを読み込み
import './Footer.css'

/**
 * Footerコンポーネント
 * 
 * @returns {JSX.Element} フッターのJSX
 */
function Footer() {
  return (
    // footer要素: フッターを意味するHTMLセマンティック要素
    <footer className="footer">
      {/* footer-container: フッターの内容を中央に配置し、最大幅を制限するコンテナ */}
      <div className="footer-container">
        {/* 劇団名グループ（左揃え） */}
        <div className="footer-company-group">
          {/* 劇団名（日本語、大きく表示） */}
          <h2 className="footer-company-name">劇團 或素翔鷺</h2>
          
          {/* ローマ字表記（劇団名の下に配置、ふりがなのように表示） */}
          <p className="footer-company-name-roman">Gekidan Alstro</p>
        </div>
        
        {/* SNSリンクセクション（中央揃え） */}
        <div className="footer-sns">
          {/* 
            X（旧Twitter）へのリンク
            target="_blank": 新しいタブで開く
            rel="noopener noreferrer": セキュリティ対策（新しいタブで開く際に必要）
            aria-label: スクリーンリーダー用の説明文
          */}
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-sns-link"
            aria-label="X（旧Twitter）"
          >
            X
          </a>
          
          {/* Instagramへのリンク */}
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-sns-link"
            aria-label="Instagram"
          >
            Instagram
          </a>
          
          {/* YouTubeへのリンク */}
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-sns-link"
            aria-label="YouTube"
          >
            YouTube
          </a>
        </div>
        
        {/* コピーライト（右揃え、控えめな色で表示） */}
        <p className="footer-copyright">
          © 2025 Gekidan Alstro. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

// Footerコンポーネントを他のファイルで使用できるようにエクスポート
export default Footer

