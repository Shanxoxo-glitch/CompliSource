import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FogAnimation from './components/FogAnimation'
import ContentSection from './components/ContentSection'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [profileImage, setProfileImage] = useState(null)

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
        <FogAnimation />
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
        />
      </div>
      <ContentSection />
    </div>
  )
}

export default App
