import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import './Dashboard.css'

function Dashboard({ isAuthenticated, userEmail, profileImage, onLogout, onLogin }) {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Calculate statistics from dashboard data
  const stats = dashboardData ? (() => {
    const rows = dashboardData.rows || []
    const totalInvoices = rows.length || 0
    //const vendor = rows.map(row => row.vendor_name || 'N/A').join(', ')
    const pass = rows.filter(row => row.status === 'pass').length
    const fail = rows.filter(row => row.status === 'fail').length
    const passRate = totalInvoices > 0 ? Math.round((pass / totalInvoices) * 100) : 0
    const failRate = totalInvoices > 0 ? Math.round((fail / totalInvoices) * 100) : 0
    
    return {
      totalInvoices,
      pass,
      fail,
      //vendor,
      passRate,
      failRate,
      score: rows[0]?.score || 0,
      //vendor: vendor
    }
  })() : {
    totalInvoices: 0,
    pass: 0,
    fail: 0,
    passRate: 0,
    failRate: 0,
    score: 0,
    //vendor: ''
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('authToken')
        const response = await axios.get('http://localhost:8000/api/dashboardVisual', {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          }
        })
        setDashboardData(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data')
        // Set default values on error
        setDashboardData({ violations: [], rows: [] })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleManualEntryClick = () => {
    navigate('/manual-entry')
  }

  const handleUploadInvoiceClick = () => {
    navigate('/upload-invoice')
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
        <h1 className="dashboard-main-title">Dashboard</h1>
        
        <div className="frames-container">
          <div className="frame">
            <div className="frame-content">
              <div className="frame-icon document-icon">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"/>
                  <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                </svg>
              </div>
              <h3>Total Invoices</h3>
              <p className="frame-number">{loading ? '...' : stats.totalInvoices}</p>
            </div>
          </div>
          
          <div className="frame">
            <div className="frame-content">
              <div className="frame-icon success-icon">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3>Pass</h3>
              <p className="frame-number">{loading ? '...' : stats.pass}</p>
            </div>
          </div>
          
          <div className="frame">
            <div className="frame-content">
              <div className="frame-icon fail-icon">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3>Fail</h3>
              <p className="frame-number">{loading ? '...' : stats.fail}</p>
            </div>
          </div>
          
          <div className="frame">
            <div className="frame-content">
              <div className="frame-icon progress-icon">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3>Pass Rate</h3>
              <p className="frame-percentage">{loading ? '...' : `${stats.passRate}%`}</p>
            </div>
          </div>
          
          <div className="frame">
            <div className="frame-content">
              <div className="frame-icon caution-icon">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3>Fail Rate</h3>
              <p className="frame-percentage">{loading ? '...' : `${stats.failRate}%`}</p>
            </div>
          </div>
        </div>
        
        <div className="graph-frame">
          <div className="graph-content">
            <div className="graph-header">
              <h3>Amount by Date</h3>
            </div>
            <div className="graph-container">
              <div className="y-axis">
                <div className="y-label">6000</div>
                <div className="y-label">4500</div>
                <div className="y-label">3000</div>
                <div className="y-label">1500</div>
                <div className="y-label">0</div>
              </div>
              <div className="graph-area">
                <div className="x-axis-center">
                  <div className="x-label-center">2025-12-11</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="invoices-frame">
          <div className="invoices-content">
            <h3 className="invoices-heading">Recent Invoices</h3>
            <div className="invoices-table">
              <div className="invoice-header">
                <div className="header-col invoice-col">Invoice</div>
                <div className="header-col vendor-col">Vendor</div>
                <div className="header-col amount-col">Amount</div>
                <div className="header-col status-col">Status</div>
                <div className="header-col risk-col">Risk</div>
                <div className="header-col date-col">Date</div>
              </div>
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                  Loading invoices...
                </div>
              ) : error ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255, 0, 0, 0.6)' }}>
                  {error}
                </div>
              ) : dashboardData?.rows?.length > 0 ? (
                dashboardData.rows.map((row, index) => (
                  <div key={index} className="invoice-row" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div className="invoice-col">{row.invoice_number || 'N/A'}</div>
                    <div className="vendor-col">{row.vendor_name || 'N/A'}</div>
                    <div className="amount-col">{row.amount}</div>
                    <div className="status-col" style={{
                      color: row.status === 'pass' ? '#4ade80' : '#f87171'
                    }}>
                      {row.status || 'N/A'}
                    </div>
                    <div className="risk-col">{row.score || 'N/A'}</div>
                    <div className="date-col">{row.created_at.split('T')[0]}</div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                  No invoices found
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="upload-frames-container">
          <div className="upload-frame" onClick={handleUploadInvoiceClick}>
            <img src="/images/digi.png" alt="Upload" className="dashboard-upload-image" />
            <div className="upload-content">
              <h3 className="upload-text">Upload Invoice</h3>
            </div>
          </div>
          
          <div className="upload-frame" onClick={handleManualEntryClick}>
            <img src="/images/manual.png" alt="Manual" className="dashboard-upload-image" />
            <div className="upload-content">
              <h3 className="upload-text">Manual Entry</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
