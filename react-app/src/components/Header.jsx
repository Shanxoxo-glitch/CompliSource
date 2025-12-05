import { useState } from 'react'
import './Header.css'

function Header({ isAuthenticated, userEmail, profileImage, onLogout, onLogin }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [gstin, setGstin] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [localProfileImage, setLocalProfileImage] = useState(null)
  const [isSignUp, setIsSignUp] = useState(true)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLocalProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTakePhoto = () => {
    alert('Camera functionality would be implemented here')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp && password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    if (email) {
      onLogin(email, localProfileImage)
      setShowLoginModal(false)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setFullName('')
      setPhone('')
      setAddress('')
      setGstin('')
      setBusinessAddress('')
      setLocalProfileImage(null)
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

  const handleLogoutClick = () => {
    onLogout()
    setProfileOpen(false)
  }

  return (
    <>
      <header className="header">
        <div className="menu-section">
          <button 
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            {!menuOpen && (
              <span className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            )}
          </button>
          <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#dashboard" className="nav-link">Dashboard</a>
            <a href="#prototype" className="nav-link">Prototype Explanation</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button 
              className="close-menu"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
              }}
              aria-label="Close Menu"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </nav>
        </div>

        <div className="header-right">
          <div className="language-selector">EN</div>
          
          <div className="profile-section">
            <button 
              className="profile-btn"
              onClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true)
                } else {
                  setProfileOpen(!profileOpen)
                }
              }}
              aria-label="Profile"
            >
              <div className="profile-circle">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
            
            {profileOpen && isAuthenticated && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <div className="profile-avatar">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="profile-details">
                    <h4>User</h4>
                    <p>{userEmail}</p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Profile Info
                </button>
                <button className="dropdown-item logout" onClick={handleLogoutClick}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

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
                    {localProfileImage ? (
                      <img src={localProfileImage} alt="Profile" className="profile-preview" />
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
                    <label htmlFor="upload-photo-header" className="upload-btn">
                      Upload
                      <input 
                        id="upload-photo-header" 
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

export default Header
