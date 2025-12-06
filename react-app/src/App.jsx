import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [progressBarColor, setProgressBarColor] = useState('white')
  const [showCircularLoader, setShowCircularLoader] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroContainer = document.querySelector('.hero-container')
      const heroHeight = heroContainer ? heroContainer.offsetHeight : 0
      
      // Calculate scroll percentage for entire page (0-100)
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const percentage = Math.min(Math.round((scrollY / documentHeight) * 100), 100)
      setScrollPercentage(percentage)
      
      // Determine background color and set progress bar color
      const plantSection = document.querySelector('.plant-section')
      const plantSectionTop = plantSection ? plantSection.offsetTop : 0
      
      if (scrollY >= plantSectionTop - window.innerHeight / 2) {
        setProgressBarColor('black')
      } else {
        setProgressBarColor('white')
      }
      
      // Hide circular loader when hero page ends
      if (scrollY >= heroHeight - window.innerHeight) {
        setShowCircularLoader(false)
      } else {
        setShowCircularLoader(true)
      }
      
      if (heroContainer) {
        const phase1Threshold = window.innerHeight * 1.5
        const phase2Threshold = window.innerHeight * 3
        
        if (scrollY < phase1Threshold) {
          // Phase 1: Homepage image scrolls up (0% to -50%)
          const progress = scrollY / phase1Threshold
          const position = 50 - (progress * 100)
          heroContainer.style.backgroundPosition = `center ${position}%`
        } else if (scrollY < phase2Threshold) {
          // Phase 2: Homepage image scrolls back up smoothly (-50% back to 0%)
          const extraScroll = scrollY - phase1Threshold
          const phase2Progress = extraScroll / (phase2Threshold - phase1Threshold)
          const position = -50 + (phase2Progress * 50)
          heroContainer.style.backgroundPosition = `center ${position}%`
        } else {
          // Keep at final position
          heroContainer.style.backgroundPosition = `center 0%`
        }
      }
    }

    let ticking = false
    const smoothScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', smoothScroll, { passive: true })
    return () => window.removeEventListener('scroll', smoothScroll)
  }, [])

  const handleLogin = (email, image = null) => {
    setIsAuthenticated(true)
    setUserEmail(email)
    if (image) {
      setProfileImage(image)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserEmail('')
    setProfileImage(null)
  }

  return (
    <div className="app">
      <div className="hero-container">
        <Header 
          isAuthenticated={isAuthenticated} 
          userEmail={userEmail}
          profileImage={profileImage}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
        <Hero 
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          scrollPercentage={scrollPercentage}
          progressBarColor={progressBarColor}
          showCircularLoader={showCircularLoader}
        />
      </div>
      <div className="plant-section">
        <div className="plant-content">
          {/* Our Services content will go here */}
        </div>
      </div>
    </div>
  )
}

export default App
