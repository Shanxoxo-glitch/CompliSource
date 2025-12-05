import './ContentSection.css'

function ContentSection() {
  return (
    <section className="content-section">
      <div className="content-wrapper">
        <h2>Our Services</h2>
        <p>Discover how Complisource streamlines your compliance process with cutting-edge technology and expert guidance.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>Fast Authentication</h3>
            <p>Get your compliance verified in seconds with our automated system.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Process</h3>
            <p>Your data is protected with industry-leading security standards.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Our team is always available to assist you with any questions.</p>
          </div>
          <div className="feature-card">
            <h3>Comprehensive Reports</h3>
            <p>Receive detailed compliance reports and analytics instantly.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContentSection
