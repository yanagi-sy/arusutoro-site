import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import PerformancesSection from './components/PerformancesSection'
import './App.css'

function App() {
  return (
    // 背景画像を全体に適用するラッパー
    <div className="app-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PerformancesSection />
    </div>
  )
}

export default App
