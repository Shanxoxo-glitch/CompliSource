import { useState } from 'react'
import './Hero.css'

function Hero({ isAuthenticated, onLogin }) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [gstin, setGstin] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [isSignUp, setIsSignUp] = useState(true)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTakePhoto = () => {
    // This would trigger camera access in a real app
    alert('Camera functionality would be implemented here')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp && password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    if (email) {
      onLogin(email, profileImage)
      setShowLoginModal(false)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setFullName('')
      setPhone('')
      setAddress('')
      setGstin('')
      setBusinessAddress('')
      setProfileImage(null)
    }
  }

  const toggleAuthMode = () => {
    const modalContent = document.querySelector('.modal-content')
    if (modalContent) {
      modalContent.style.opacity = '0'
      setTimeout(() => {
        setIsSignUp(!isSignUp)
        modalContent.style.opacity = '1'
      }, 300)
    }
  }

  return (
    <>
      <main className="hero-section">
        <h1 className="brand-name">Complisource</h1>
        <p className="tagline">Get your compliance authenticated within seconds</p>
        
        {!isAuthenticated ? (
          <button 
            className="cta-button"
            onClick={() => setShowLoginModal(true)}
          >
            Get Started
          </button>
        ) : (
          <div className="authenticated-buttons">
            <button className="cta-button" onClick={() => window.location.href = '#dashboard'}>
              Go to Dashboard
            </button>
            <button className="cta-button secondary" onClick={() => window.location.href = '#about'}>
              About Us
            </button>
          </div>
        )}
      </main>

      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div 
            className={`modal-content ${isSignUp ? 'signup-mode' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-decorative-border"></div>
            <div 
              className="modal-image-section"
              style={{
                backgroundImage: isSignUp 
                  ? 'url(/images/black-green-flower.png)' 
                  : 'url(/images/black-blue-flower.png)'
              }}
            ></div>
            <div className="modal-form-section">
              <button className="close-modal" onClick={() => setShowLoginModal(false)}>×</button>
              <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
              
              {isSignUp && (
                <div className="profile-picture-upload">
                  <div className="profile-picture-frame">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="profile-preview" />
                    ) : (
                      <div className="profile-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="profile-upload-buttons">
                    <label htmlFor="upload-photo" className="upload-btn">
                      Upload
                      <input 
                        id="upload-photo" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button type="button" className="upload-btn" onClick={handleTakePhoto}>
                      Camera
                    </button>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="GSTIN"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Business Address"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                    />
                  </>
                )}
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {isSignUp && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                )}
                <button type="submit" className="submit-button">
                  {isSignUp ? 'Sign Up' : 'Log In'}
                </button>
              </form>
              <p className="toggle-auth">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <span onClick={toggleAuthMode}>
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Hero
