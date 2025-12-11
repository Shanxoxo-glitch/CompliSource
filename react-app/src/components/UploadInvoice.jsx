import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import './Dashboard.css'

function UploadInvoice({ isAuthenticated, userEmail, profileImage, onLogout, onLogin }) {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    
    const file = event.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUploadAndAnalyze = () => {
    if (selectedFile) {
      console.log('Uploading and analyzing file:', selectedFile.name)
      // Here you would implement the actual upload and analysis logic
      alert(`File "${selectedFile.name}" uploaded successfully! Analysis would begin here.`)
    } else {
      alert('Please select a file first.')
    }
  }

  return (
    <div className="dashboard">
      <Header 
        isAuthenticated={isAuthenticated} 
        userEmail={userEmail}
        profileImage={profileImage}
        onLogout={onLogout}
        onLogin={onLogin}
      />
      
      <div className="video-background">
        <div className="video-overlay"></div>
      </div>
      
      <div className="dashboard-content">
        <div className="page-header">
          <h1 className="dashboard-title">Invoice Processing</h1>
          <a href="#" className="dashboard-link" onClick={handleBackToDashboard}>Go to Dashboard</a>
        </div>
        <p className="dashboard-subtitle">Upload invoices for OCR extraction, compliance checking, and tax calculation</p>
        
        <div className="upload-frames-vertical">
          <div className="upload-frame">
            <img src="/images/pen.png" alt="Pen" className="pen-image" />
            <div className="upload-content">
              <div className="upload-layout">
                <div className="upload-header">
                  <div className="circle-indicator">
                    <div className="green-circle"></div>
                    <div className="emanating-circle"></div>
                    <div className="emanating-circle"></div>
                    <div className="emanating-circle"></div>
                  </div>
                  <div>
                    <h3 className="upload-title">Single Invoice Processing</h3>
                    <p className="upload-desc">Upload and process one invoice at a time</p>
                  </div>
                </div>
                
                <div className="upload-body">
                  <div className="upload-section">
                    <h4 className="section-title">Upload Files</h4>
                    <div className={`upload-area-large ${isDragging ? 'dragging' : ''}`}
                         onDragOver={handleDragOver}
                         onDragLeave={handleDragLeave}
                         onDrop={handleDrop}>
                      <input
                        type="file"
                        id="file-input"
                        className="file-input"
                        onChange={handleFileSelect}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                      <label htmlFor="file-input" className="upload-area-label">
                        <p className="upload-area-text">
                          {selectedFile ? selectedFile.name : 'Click and drag or upload'}
                        </p>
                      </label>
                    </div>
                  </div>
                  
                  <div className="action-section">
                    <button className="upload-analyze-btn" onClick={handleUploadAndAnalyze}>Upload and Analyze</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="upload-frame">
            <img src="/images/notes.png" alt="Notes" className="pen-image" />
            <div className="upload-content">
              <div className="upload-layout">
                <div className="upload-header">
                  <div className="circle-indicator">
                    <div className="yellow-circle"></div>
                    <div className="emanating-circle"></div>
                    <div className="emanating-circle"></div>
                    <div className="emanating-circle"></div>
                  </div>
                  <div>
                    <h3 className="upload-title">Batch Processing</h3>
                    <p className="upload-desc">Upload and process multiple invoices at once</p>
                  </div>
                </div>
                
                <div className="upload-body">
                  <div className="upload-section">
                    <h4 className="section-title">Upload Files</h4>
                    <div className={`upload-area-large ${isDragging ? 'dragging' : ''}`}
                         onDragOver={handleDragOver}
                         onDragLeave={handleDragLeave}
                         onDrop={handleDrop}>
                      <input
                        type="file"
                        id="batch-file-input"
                        className="file-input"
                        onChange={handleFileSelect}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        multiple
                      />
                      <label htmlFor="batch-file-input" className="upload-area-label">
                        <p className="upload-area-text">
                          {selectedFile ? selectedFile.name : 'Click and drag or upload multiple files'}
                        </p>
                      </label>
                    </div>
                  </div>
                  
                  <div className="action-section">
                    <button className="upload-analyze-btn">Upload Batch</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadInvoice
