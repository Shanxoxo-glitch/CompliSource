import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import './Dashboard.css'

function ManualInvoiceEntry({ isAuthenticated, userEmail, profileImage, onLogout, onLogin }) {
  const navigate = useNavigate()

  const handleBackToDashboard = () => {
    navigate('/dashboard')
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
          <h1 className="dashboard-title">Manual Invoice Entry</h1>
          <a href="#" className="dashboard-link" onClick={handleBackToDashboard}>Go to Dashboard</a>
        </div>
        <p className="dashboard-subtitle">Manually enter invoice details and calculate tax compliance</p>
        
        <div className="horizontal-frames-container">
          <div className="horizontal-frame">
            <div className="frame-content">
              <h3 className="frame-title">Invoice Details</h3>
              <div className="invoice-details-grid">
                <div className="detail-group">
                  <label className="detail-label">Invoice Number *</label>
                  <input type="text" className="frame-input" placeholder="Enter invoice number (e.g., INV-001)" />
                </div>
                <div className="detail-group">
                  <label className="detail-label">Invoice Date *</label>
                  <input type="date" className="frame-input" />
                </div>
                <div className="detail-group">
                  <label className="detail-label">Invoice Type</label>
                  <select className="frame-input">
                    <option value="">Select invoice type</option>
                    <option value="tax-invoice">Tax Invoice</option>
                    <option value="bill-of-supply">Bill of Supply</option>
                    <option value="credit-note">Credit Note</option>
                    <option value="debit-note">Debit Note</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="horizontal-frame">
            <div className="frame-content">
              <h3 className="frame-title">Vendor Information</h3>
              <div className="vendor-details-grid">
                <div className="detail-group">
                  <label className="detail-label">Vendor Name *</label>
                  <input type="text" className="frame-input" placeholder="Enter vendor name (e.g., Acme Corp)" />
                </div>
                <div className="detail-group">
                  <label className="detail-label">Vendor GSTIN</label>
                  <input type="text" className="frame-input" placeholder="Enter GSTIN (e.g., 29AAAPL1234C1ZV)" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="horizontal-frame">
            <div className="frame-content">
              <h3 className="frame-title">Buyer Information</h3>
              <div className="buyer-details-grid">
                <div className="detail-group">
                  <label className="detail-label">Buyer Name</label>
                  <input type="text" className="frame-input" placeholder="Enter buyer name" />
                </div>
                <div className="detail-group">
                  <label className="detail-label">Buyer GSTIN</label>
                  <input type="text" className="frame-input" placeholder="Enter buyer GSTIN" />
                </div>
                <div className="detail-group">
                  <label className="detail-label">Place of Supply</label>
                  <select className="frame-input">
                    <option value="">Select state</option>
                    <option value="andhra-pradesh">Andhra Pradesh</option>
                    <option value="arunachal-pradesh">Arunachal Pradesh</option>
                    <option value="assam">Assam</option>
                    <option value="bihar">Bihar</option>
                    <option value="chhattisgarh">Chhattisgarh</option>
                    <option value="goa">Goa</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="haryana">Haryana</option>
                    <option value="himachal-pradesh">Himachal Pradesh</option>
                    <option value="jharkhand">Jharkhand</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="kerala">Kerala</option>
                    <option value="madhya-pradesh">Madhya Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="manipur">Manipur</option>
                    <option value="meghalaya">Meghalaya</option>
                    <option value="mizoram">Mizoram</option>
                    <option value="nagaland">Nagaland</option>
                    <option value="odisha">Odisha</option>
                    <option value="punjab">Punjab</option>
                    <option value="rajasthan">Rajasthan</option>
                    <option value="sikkim">Sikkim</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="telangana">Telangana</option>
                    <option value="tripura">Tripura</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="uttarakhand">Uttarakhand</option>
                    <option value="west-bengal">West Bengal</option>
                  </select>
                </div>
                <div className="detail-group">
                  <label className="detail-label">Reverse Charge Applicable</label>
                  <div className="checkbox-container">
                    <input type="checkbox" id="reverse-charge" className="frame-checkbox" />
                    <label htmlFor="reverse-charge" className="checkbox-label">Yes</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="horizontal-frame">
            <div className="frame-content">
              <h3 className="frame-title">Line Items</h3>
              <div className="line-items-container">
                <div className="line-items-header">
                  <div className="item-col description-col">Description</div>
                  <div className="item-col quantity-col">Quantity</div>
                  <div className="item-col mrp-col">MRP(optional)</div>
                  <div className="item-col rate-col">Rate(used for tax)</div>
                  <div className="item-col hsn-col">HSN/SAC Code</div>
                  <div className="item-col taxable-col">Taxable Value</div>
                  <div className="item-col remove-col">Remove</div>
                </div>
                <div className="line-item-row">
                  <input type="text" className="item-input" placeholder="Item description" />
                  <input type="number" className="item-input" placeholder="Qty" />
                  <input type="number" className="item-input" placeholder="MRP" />
                  <input type="number" className="item-input" placeholder="Rate" />
                  <input type="text" className="item-input" placeholder="HSN/SAC" />
                  <input type="number" className="item-input" placeholder="Value" />
                  <button className="remove-btn">×</button>
                </div>
                <button className="add-item-btn">+ Add Item</button>
              </div>
            </div>
          </div>
          
          <div className="horizontal-frame">
            <div className="frame-content">
              <h3 className="frame-title">Tax Calculation</h3>
              <div className="tax-calculation-grid">
                <div className="detail-group">
                  <label className="detail-label">Taxable Amount *</label>
                  <input type="number" className="frame-input" placeholder="Enter taxable amount" />
                </div>
                <div className="detail-group">
                  <label className="detail-label">Discount Amount</label>
                  <input type="number" className="frame-input" placeholder="Enter discount amount" />
                </div>
                <div className="detail-group">
                  <label className="detail-label">GST Rate (%) *</label>
                  <select className="frame-input">
                    <option value="">Select Rate</option>
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="6">6%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>
              </div>
              
              <div className="tax-breakdown-section">
                <h4 className="breakdown-title">Calculated Tax Breakdown</h4>
                <div className="tax-breakdown-grid">
                  <div className="tax-item">
                    <span className="tax-label">CGST</span>
                    <span className="tax-value">Rs. 0.00</span>
                  </div>
                  <div className="tax-item">
                    <span className="tax-label">SGST</span>
                    <span className="tax-value">Rs. 0.00</span>
                  </div>
                  <div className="tax-item">
                    <span className="tax-label">IGST</span>
                    <span className="tax-value">Rs. 0.00</span>
                  </div>
                  <div className="tax-item">
                    <span className="tax-label">Total Tax</span>
                    <span className="tax-value">Rs. 0.00</span>
                  </div>
                  <div className="tax-item">
                    <span className="tax-label">Invoice Total</span>
                    <span className="tax-value">Rs. 0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="compliance-button-container">
          <button className="create-compliance-btn" onClick={handleBackToDashboard}>Create Compliance</button>
        </div>
      </div>
    </div>
  )
}

export default ManualInvoiceEntry
