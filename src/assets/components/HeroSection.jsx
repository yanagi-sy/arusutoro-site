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
    </section>
  )
}

export default HeroSection
