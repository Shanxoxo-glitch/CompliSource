import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import Header from './components/Header'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import ManualInvoiceEntry from './components/ManualInvoiceEntry'
import UploadInvoice from './components/UploadInvoice'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [progressBarColor, setProgressBarColor] = useState('white')
  const [showCircularLoader, setShowCircularLoader] = useState(true)
  const [counterValue, setCounterValue] = useState(0)
  const [cpuPercentage, setCpuPercentage] = useState(0)
  const [flowerSectionInView, setFlowerSectionInView] = useState(false)

  useEffect(() => {
    // Reset and start animations when flower section comes into view
    if (flowerSectionInView) {
      // Reset values to 0
      setCounterValue(0)
      setCpuPercentage(0)
      
      // Animate counter from 0 to 5
      const counterInterval = setInterval(() => {
        setCounterValue(prev => {
          if (prev < 5) return prev + 1
          clearInterval(counterInterval)
          return 5
        })
      }, 400)

      // Animate CPU loader from 0 to 99
      const cpuInterval = setInterval(() => {
        setCpuPercentage(prev => {
          if (prev < 99) return prev + 1
          clearInterval(cpuInterval)
          return 99
        })
      }, 30)

      return () => {
        clearInterval(counterInterval)
        clearInterval(cpuInterval)
      }
    }
  }, [flowerSectionInView])

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
      
      // Change CompliSource text color based on scroll with left-to-right reveal
      const complisourceText = document.querySelector('.complisource-text p')
      if (complisourceText) {
        const plantSectionTop = plantSection ? plantSection.offsetTop : 0
        const windowHeight = window.innerHeight
        
        // Only start changing when plant section is in view
        if (scrollY >= plantSectionTop - windowHeight / 2) {
          // Calculate progress of scroll within plant section
          const scrollProgress = Math.min((scrollY - (plantSectionTop - windowHeight / 2)) / (windowHeight / 2), 1)
          
          // Create left-to-right reveal effect using background-clip
          const revealPercentage = scrollProgress * 100
          complisourceText.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.9) ${revealPercentage}%, rgba(128, 128, 128, 0.8) ${revealPercentage}%, rgba(128, 128, 128, 0.8) 100%)`
          complisourceText.style.webkitBackgroundClip = 'text'
          complisourceText.style.webkitTextFillColor = 'transparent'
          complisourceText.style.backgroundClip = 'text'
        } else {
          // Reset to grey when not in plant section
          complisourceText.style.background = 'none'
          complisourceText.style.webkitTextFillColor = 'rgba(128, 128, 128, 0.8)'
          complisourceText.style.color = 'rgba(128, 128, 128, 0.8)'
        }
      }
      
      // Check if flower section is in view to trigger animations
      const flowerSection = document.querySelector('.black-flower-section')
      if (flowerSection) {
        const flowerTop = flowerSection.offsetTop
        const flowerHeight = flowerSection.offsetHeight
        const windowHeight = window.innerHeight
        
        // Check if flower section is in viewport
        if (scrollY + windowHeight >= flowerTop && scrollY <= flowerTop + flowerHeight) {
          if (!flowerSectionInView) {
            setFlowerSectionInView(true)
          }
        } else {
          setFlowerSectionInView(false)
        }
      }
      
      // Hide circular loader when hero page ends
      if (scrollY >= heroHeight - window.innerHeight) {
        setShowCircularLoader(false)
      } else {
        setShowCircularLoader(true)
      }
      
      // Animate stones frame floating upwards as we scroll - DISABLED
      // if (plantSection) {
      //   const plantTop = plantSection.offsetTop
      //   const plantHeight = plantSection.offsetHeight
      //   const scrollInPlant = scrollY - plantTop + window.innerHeight
        
      //   if (scrollY >= plantTop - window.innerHeight && scrollY <= plantTop + plantHeight) {
      //     const progress = Math.min(scrollInPlant / (window.innerHeight + plantHeight), 1)
      //     const maxMoveUp = -50 // Move 50% upwards
      //     const translateY = progress * maxMoveUp
      //     plantSection.style.transform = `translateY(${translateY}%)`
      //   } else {
      //     plantSection.style.transform = 'translateY(0%)'
      //   }
        
      //   // Animate arch image with GSAP for more noticeable movement without gaps
      //   const archImage = document.querySelector('.arch-image')
      //   if (archImage) {
      //     const progress = (scrollInPlant / (window.innerHeight + plantHeight)) - 0.5
      //     const maxMovement = 60 // Increased movement for more noticeable effect
      //     const translateY = progress * maxMovement
        
      //     // Use GSAP for smooth animation with strict clamping to prevent gaps
      //     gsap.to(archImage, {
      //       y: translateY,
      //       duration: 0.3,
      //       ease: "power2.out",
      //       onUpdate: function() {
      //         // Strict clamping to stay within frame bounds
      //         const currentY = gsap.getProperty(archImage, "y")
      //         const clampedY = Math.max(-40, Math.min(40, currentY)) // Clamp to ±40px
      //         if (Math.abs(currentY - clampedY) > 0.1) {
      //           gsap.set(archImage, { y: clampedY })
      //         }
      //       }
      //     })
      //   }
      // }
      
      // Animate login/signup image floating up as we scroll
      const loginsignupImage = document.querySelector('.loginsignup-image')
      if (loginsignupImage) {
        const imageProgress = Math.min(scrollY / (heroHeight + window.innerHeight), 1)
        const maxFloatUp = -80 // Float up 80px (increased from 40px)
        const translateY = imageProgress * maxFloatUp
        loginsignupImage.style.transform = `translateY(${translateY}px)`
      }
      
      // Animate deep-ocean section floating upwards as we scroll
      const deepOceanSection = document.querySelector('.deep-ocean-section')
      if (deepOceanSection) {
        const deepOceanWrapper = document.querySelector('.deep-ocean-wrapper')
        const wrapperTop = deepOceanWrapper ? deepOceanWrapper.offsetTop : 0
        const deepOceanHeight = deepOceanSection.offsetHeight
        const scrollInDeepOcean = scrollY - wrapperTop + window.innerHeight
        
        if (scrollY >= wrapperTop - window.innerHeight && scrollY <= wrapperTop + deepOceanHeight) {
          const progress = Math.min(scrollInDeepOcean / (window.innerHeight + deepOceanHeight), 1)
          const maxMoveUp = -50 // Move 50% upwards
          const translateY = progress * maxMoveUp
          deepOceanSection.style.transform = `translateY(${translateY}%)`
        } else {
          deepOceanSection.style.transform = 'translateY(0%)'
        }
      }
      
      // Animate boathouse section floating upwards as we scroll
      const boathouseSection = document.querySelector('.boathouse-section')
      if (boathouseSection) {
        const boathouseTop = boathouseSection.offsetTop
        const boathouseHeight = boathouseSection.offsetHeight
        const scrollInBoathouse = scrollY - boathouseTop + window.innerHeight
        
        if (scrollY >= boathouseTop - window.innerHeight && scrollY <= boathouseTop + boathouseHeight) {
          const progress = Math.min(scrollInBoathouse / (window.innerHeight + boathouseHeight), 1)
          const maxMoveUp = -60 // Move 60% upwards
          const translateY = progress * maxMoveUp
          boathouseSection.style.transform = `translateY(${translateY}%)`
        } else {
          boathouseSection.style.transform = 'translateY(0%)'
        }
      }
      
      // Animate lake-cherry section floating upwards as we scroll
      const lakeCherrySection = document.querySelector('.lake-cherry-section')
      if (lakeCherrySection) {
        const lakeCherryTop = lakeCherrySection.offsetTop
        const lakeCherryHeight = lakeCherrySection.offsetHeight
        const scrollInLakeCherry = scrollY - lakeCherryTop + window.innerHeight
        
        if (scrollY >= lakeCherryTop - window.innerHeight && scrollY <= lakeCherryTop + lakeCherryHeight) {
          const progress = Math.min(scrollInLakeCherry / (window.innerHeight + lakeCherryHeight), 1)
          const maxMoveUp = -40 // Move 40% upwards
          const translateY = progress * maxMoveUp
          lakeCherrySection.style.transform = `translate(-50%, calc(-50% + ${translateY}%))`
        } else {
          lakeCherrySection.style.transform = 'translate(-50%, -50%)'
        }
      }
      
      // Animate underline letters on scroll
      const underlineLetters = document.querySelectorAll('.underline-letter')
      const bkg2LeftText = document.querySelector('.bkg2-left-text')
      if (bkg2LeftText) {
        const bkg2TextTop = document.querySelector('.bkg2-text-above-frame')?.offsetTop || 0
        const scrollProgress = Math.min(scrollY / (bkg2TextTop + window.innerHeight), 1)
        
        if (scrollProgress > 0.3) {
          bkg2LeftText.classList.add('underlined')
        }
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

    window.addEventListener('scroll', smoothScroll, { passive: true, capture: true })
    return () => window.removeEventListener('scroll', smoothScroll, { capture: true })
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
    <Router>
      <Routes>
        <Route path="/" element={
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
                <div className="overview-left">
                  <h2 className="overview-text">overview</h2>
                  <div className="arch-window-frame">
                    <div className="arch-window">
                      <img src="/images/arch.png" alt="Architecture" className="arch-image" />
                    </div>
                  </div>
                </div>
                <div className="complisource-right">
                  <div className="complisource-text">
                    <p>CompliSource was created to bring clarity and cohesion to the highly fragmented world of multi-state regulatory compliance. Instead of forcing lenders and financial institutions to sift through scattered statutes and dense legal text, it delivers a single, authoritative hub of attorney-crafted, plain-language guidance across all U.S. jurisdictions. The platform combines comprehensive coverage, expert-curated summaries, multi-state comparison tools, and real-time updates to help organizations stay ahead of regulatory change with confidence. By standardizing compliance intelligence and making it accessible across entire teams, CompliSource transforms complex legal requirements into practical, actionable insights—empowering institutions to operate consistently, scale smoothly, and reduce compliance risk with elegance and efficiency.</p>
                  </div>
                  <div className="loginsignup-container">
                    <img src="/images/loginsignup.png" alt="Login Signup" className="loginsignup-image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="black-flower-section">
              <div className="black-flower-content">
                <div className="left-content">
                  <div className="counter-number">{counterValue}</div>
                  <p className="counter-text">languages embedded</p>
                </div>
                <div className="right-content">
                  <div className="cpu-loader">
                    <svg className="cpu-svg" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" className="cpu-circle"></circle>
                      <circle cx="50" cy="50" r="40" className="cpu-progress" style={{
                        strokeDashoffset: 251.2 - (251.2 * cpuPercentage / 100)
                      }}></circle>
                    </svg>
                    <div className="cpu-percentage">{cpuPercentage}%</div>
                  </div>
                  <p className="cpu-text">our model has a high accuracy rate</p>
                </div>
                <div className="center-content">
                  <p className="compliance-text">Get your compliance audited now within just a reach of a click away,<br />it's that simple, try it</p>
                </div>
              </div>
            </div>
            <div className="lake-cherry-section">
              <div className="lake-cherry-content">
                {/* Content removed */}
              </div>
            </div>
            <div className="deep-ocean-wrapper">
              <div className="deep-ocean-left-text">REDUCE YOUR WORK</div>
              <div className="deep-ocean-right-text">TO A CLICK</div>
              <div className="deep-ocean-section">
                <div className="deep-ocean-content">
                  {/* Content removed */}
                </div>
              </div>
            </div>
            <div className="boathouse-section">
              <div className="boathouse-content">
                {/* Content removed */}
              </div>
            </div>
            <div className="bkg2-text-above-frame">
              <div className="bkg2-text-content">
                <div className="bkg2-left-text">
                <div>Data</div>
                <div>Manipulation</div>
              </div>
                <div className="bkg2-right-text">csv files are read and analyzed to provide information about compliance</div>
              </div>
            </div>
            <div className="bkg2-section">
              <div className="window-controls">
                <div className="window-dot red"></div>
                <div className="window-dot yellow"></div>
                <div className="window-dot green"></div>
              </div>
              <div className="bkg2-content">
                <div className="bkg2-sidebar">
                  <div className="green-mountain-container">
                    <img src="/images/green-mountain.png" alt="Green Mountain" className="green-mountain-image" />
                  </div>
                </div>
                <div className="bkg2-main">
                  <div className="transparent-frame">
                    {/* Empty frame for future content */}
                  </div>
                </div>
              </div>
            </div>
            <div className="beach-section">
              <div className="window-controls">
                <div className="window-dot red"></div>
                <div className="window-dot yellow"></div>
                <div className="window-dot green"></div>
              </div>
              <div className="beach-text-above-frame">
                <div className="beach-text-content">
                  <div className="beach-left-text">
                    <div>Blockchain</div>
                    <div>Implementation</div>
                  </div>
                  <div className="beach-right-text">secure distributed ledger technology <br />for compliance tracking</div>
                </div>
              </div>
              <div className="beach-content">
                <div className="beach-main">
                  <div className="transparent-frame">
                    {/* Empty frame for future content */}
                  </div>
                </div>
                <div className="beach-sidebar">
                  <div className="ocean-container">
                    <img src="/images/ocean.png" alt="Ocean" className="ocean-image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="red-frost-section">
              <div className="window-controls">
                <div className="window-dot red"></div>
                <div className="window-dot yellow"></div>
                <div className="window-dot green"></div>
              </div>
              <div className="red-frost-content">
                <div className="red-frost-sidebar">
                  <div className="misty-mountains-container">
                    <img src="/images/misty-mountains-sun.png" alt="Misty Mountains" className="misty-mountains-image" />
                  </div>
                </div>
                <div className="red-frost-main">
                  <div className="transparent-frame">
                    {/* Empty frame for future content */}
                  </div>
                </div>
              </div>
            </div>
            <div className="black-orange-flower-container">
              <div className="flower-content">
                <p className="flower-text">try our premium</p>
                <button className="premium-button">try premium</button>
              </div>
              <img src="/images/black-orange-flower.png" alt="Black Orange Flower" className="black-orange-flower-image" />
            </div>
          </div>
        } />
        <Route path="/dashboard" element={
          <Dashboard 
            isAuthenticated={isAuthenticated}
            userEmail={userEmail}
            profileImage={profileImage}
            onLogout={handleLogout}
            onLogin={handleLogin}
          />
        } />
        <Route path="/manual-entry" element={
          <ManualInvoiceEntry 
            isAuthenticated={isAuthenticated}
            userEmail={userEmail}
            profileImage={profileImage}
            onLogout={handleLogout}
            onLogin={handleLogin}
          />
        } />
        <Route path="/upload-invoice" element={
          <UploadInvoice 
            isAuthenticated={isAuthenticated}
            userEmail={userEmail}
            profileImage={profileImage}
            onLogout={handleLogout}
            onLogin={handleLogin}
          />
        } />
      </Routes>
      
      </Router>
  )
}

export default App
