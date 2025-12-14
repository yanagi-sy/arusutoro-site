// AboutSectionコンポーネント（口上セクション）
// 劇団紹介セクション（和紙の紙面のようなUI）
// 後から文言を差し替えやすい構造にする
import './AboutSection.css'

function AboutSection() {
  // 口上のテキスト（後から差し替え可能）
  const kujoText = [
    '劇團 或素翔鷺は、',
    '言葉と身体、沈黙と緊張のあわいに',
    '刹那の像を立ち上げるために集った劇団である。'
  ]

  return (
    <section className="about">
      {/* 和紙の紙面のようなコンテナ */}
      <div className="about-container">
        {/* 口上のテキスト（文学的・詩的、簡潔に） */}
        <div className="about-content">
          {kujoText.map((line, index) => (
            <p key={index} className="about-text">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
