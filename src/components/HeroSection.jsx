// HeroSectionコンポーネント
// 背景画像（header.jpg）と縦書きテキストを重ねて表示するヒーローセクション
import headerImage from '../assets/images/header.jpg'
import './HeroSection.css'

function HeroSection() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${headerImage})`,
      }}
    >
      {/* 縦書きで表示する劇団名（画面左寄りに配置） */}
      <div className="hero-vertical-text">
        <h1 className="hero-title-vertical">劇団 或素翔鷲</h1>
      </div>
    </section>
  )
}

export default HeroSection
