// AboutSectionコンポーネント
// 劇団紹介セクション（テキスト中心のUI）
import './AboutSection.css'

function AboutSection() {
  return (
    <section className="about">
      {/* コンテンツを中央に配置し、最大幅を制限するコンテナ */}
      <div className="about-container">
        {/* 見出し */}
        <h2 className="about-title">劇団について</h2>
        
        {/* 本文（ダミーテキスト） */}
        <div className="about-content">
          <p className="about-text">
            ここには劇団の紹介文が入ります。後で実際の内容に差し替えます。
            文章量が増えても崩れないように、適切な幅と余白を設定しています。
          </p>
          <p className="about-text">
            複数の段落にも対応できる構造になっています。
            テキストは読みやすい最大幅に制限され、中央に配置されます。
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

