import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CircleProgress from '../components/CircleProgress'

const leaveTypes = [
  { id: 'cl', name: 'Casual Leave', available: 6, used: 4, total: 10, color: '#f59e0b' },
  { id: 'el', name: 'Earned Leave', available: 10.42, used: 10, total: 15, color: '#ef4444' },
  { id: 'ml', name: 'Marriage Leave', available: 5, used: 0, total: 5, color: '#06b6d4' },
  { id: 'sl', name: 'Sick Leave', available: 3, used: 3, total: 6, color: '#8b5cf6' }
]

export default function Dashboard(){
  const navigate = useNavigate()
  const [profile, setProfile] = React.useState({ name: 'kritika', email: 'kritika.yadav@jims.edu', department: 'Computer Applications' })

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('profileUser')
      if (raw) setProfile(JSON.parse(raw))
    } catch (err) {
      // ignore
    }
  }, [])

  return (
    <div className="dashboard-layout">
      {/* Welcome Header */}
      <div className="page-title">
        <div>
          <h2 style={{margin:0}}>Welcome, {profile.name.split(' ')[0]}</h2>
          <div style={{color:'var(--muted)'}}>Faculty Dashboard</div>
        </div>
      </div>

      {/* Top Row: Profile Card and Leave Summary */}
      <div className="dashboard-row top">
        {/* Profile Card */}
        <div className="dashboard-card profile-card">
          <img src={profile.avatar || "https://i.pravatar.cc/150?img=12"} alt="Profile" />
          <div className="profile-meta">
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-role">{profile.role || 'Assistant Professor'}</p>
            <p className="profile-dept">{profile.department}</p>
          </div>
        </div>

        {/* Leave Summary (Graphical) */}
        <div className="dashboard-card">
          <h3 className="card-title">Leave Summary</h3>
          <div className="leave-summary-grid">
            <div className="leave-summary-container">
              {leaveTypes.map(leave => (
                <div key={leave.id} className="leave-summary-item">
                  <div className="progress-circle">
                    <CircleProgress
                      percentage={(leave.available / leave.total) * 100}
                      color={leave.color}
                      size={56}
                      strokeWidth={6}
                    />
                    <div className="progress-info">
                      <span className="progress-value">{leave.available}</span>
                    </div>
                  </div>
                  <div className="leave-details">
                    <div className="leave-name">{leave.name}</div>
                    <div className="leave-mini-stats">
                      <span className="stat-label">Total: <strong>{leave.total}</strong></span>
                      <span className="stat-label">Used: <strong>{leave.used}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
      {/* Leave Balance Section */}
      <div className="dashboard-row">
        <div className="dashboard-card leave-balance-section">
          <h3 className="card-title">Leave Balance</h3>
          <div className="leave-balance-grid">
            {leaveTypes.map(leave => (
              <div key={leave.id} className="balance-item">
                <div className="balance-header">
                  <h4>{leave.name}</h4>
                  <span className="balance-total">Total: {leave.total}</span>
                </div>
                <div className="balance-details">
                  <div className="balance-row">
                    <span>Available</span>
                    <span>{leave.available}</span>
                  </div>
                  <div className="balance-row">
                    <span>Used</span>
                    <span>{leave.used}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave History Section */}
      <div className="dashboard-row">
        <div className="dashboard-card leave-history-section">
          <div className="history-header">
            <h3 className="card-title">Leave History</h3>
            <div className="history-filters">
              <select className="filter-select">
                <option value="">All Types</option>
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              <select className="filter-select">
                <option value="">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="search-box">
                <input type="text" placeholder="Search..." className="search-input" />
              </div>
            </div>
              <div className="history-card" style={{marginTop:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontWeight:700,fontSize:18}}>Leave History</div>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <select style={{padding:8,borderRadius:6,border:'1px solid var(--border)'}}> 
                      <option>All Types</option>
                      <option>Earned Leave</option>
                      <option>Floater Leave</option>
                      <option>Sick Leave</option>
                    </select>
                    <select style={{padding:8,borderRadius:6,border:'1px solid var(--border)'}}>
                      <option>All Status</option>
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Rejected</option>
                    </select>
                    <input placeholder="Search" style={{padding:8,borderRadius:6,border:'1px solid var(--border)'}} />
                  </div>
                </div>

                <div style={{marginTop:12,overflowX:'auto'}}>
                  <table className="leave-history-table">
                    <thead>
                      <tr>
                        <th>Leave Dates</th>
                        <th>Leave Type</th>
                        <th>Status</th>
                        <th>Requested By</th>
                        <th>Action Taken On</th>
                        <th>Leave Note</th>
                        <th>Reject/Cancellation Reason</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {dates:'23 Oct - 24 Oct 2025\n2 Days', type:'Earned Leave\nRequested on 29 Sep 2025', status:'Approved\nby Amit Bora', requestedBy:'Himanshu Gola', actionOn:'06 Oct 2025', note:'Taking leave for family commitment.'},
                        {dates:'01 Oct 2025\n1 Day', type:'Floater Leave\nRequested on 24 Sep 2025', status:'Approved\nby Amit Bora', requestedBy:'Himanshu Gola', actionOn:'25 Sep 2025', note:'Floater Leave'},
                        {dates:'26 Sept 2025\n1 Day', type:'Sick Leave\nRequested on 26 Sep 2025', status:'Approved\nby Amit Bora', requestedBy:'Himanshu Gola', actionOn:'29 Sep 2025', note:'Not well today, will be on sick leave.'},
                        {dates:'11 Jul 2025\n1 Day', type:'Sick Leave\nRequested on 11 Jul 2025', status:'Approved\nby Amit Bora', requestedBy:'Himanshu Gola', actionOn:'14 Jul 2025', note:'Taking one day sick leave , as not feeling well.'},
                        {dates:'19 May 2025\n1 Day', type:'Earned Leave\nRequested on 05 May 2025', status:'Approved\nby Amit Bora', requestedBy:'Himanshu Gola', actionOn:'12 May 2025', note:'Family Commitment'}
                      ].map((r,idx)=> (
                        <tr key={idx}>
                          <td style={{whiteSpace:'pre-line'}}>{r.dates}</td>
                          <td style={{whiteSpace:'pre-line'}}>{r.type}</td>
                          <td><span style={{color:'#10b981',fontWeight:700}}>{r.status.split('\n')[0]}</span><div style={{fontSize:12,color:'var(--muted)'}}>{r.status.split('\n')[1]}</div></td>
                          <td>{r.requestedBy}</td>
                          <td>{r.actionOn}</td>
                          <td style={{maxWidth:240}}>{r.note}</td>
                          <td>—</td>
                          <td>---</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

          <div className="table-container">
            <table className="leave-history-table">
              <thead>
                <tr>
                  <th>Leave Dates</th>
                  <th>Leave Type</th>
                  <th>Status</th>
                  <th>Requested By</th>
                  <th>Action Taken On</th>
                  <th>Leave Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    dates: '23 Oct - 24 Oct 2025',
                    days: '2 Days',
                    type: 'Earned Leave',
                    requestDate: '29 Sep 2025',
                    status: 'Approved',
                    approver: 'Amit Bora',
                    requestedBy: 'Himanshu Gola',
                    actionOn: '06 Oct 2025',
                    note: 'Taking leave for family commitment'
                  },
                  {
                    dates: '01 Oct 2025',
                    days: '1 Day',
                    type: 'Floater Leave',
                    requestDate: '24 Sep 2025',
                    status: 'Approved',
                    approver: 'Amit Bora',
                    requestedBy: 'Himanshu Gola',
                    actionOn: '25 Sep 2025',
                    note: 'Floater Leave'
                  },
                  {
                    dates: '26 Sept 2025',
                    days: '1 Day',
                    type: 'Sick Leave',
                    requestDate: '26 Sep 2025',
                    status: 'Approved',
                    approver: 'Amit Bora',
                    requestedBy: 'Himanshu Gola',
                    actionOn: '29 Sep 2025',
                    note: 'Not well today'
                  }
                ].map((leave, idx) => (
                  <tr key={idx}>
                    <td>
                      <div>{leave.dates}</div>
                      <div className="text-muted">{leave.days}</div>
                    </td>
                    <td>
                      <div>{leave.type}</div>
                      <div className="text-muted">Requested on {leave.requestDate}</div>
                    </td>
                    <td>
                      <span className={`status-badge ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
                      <div className="text-muted">by {leave.approver}</div>
                    </td>
                    <td>{leave.requestedBy}</td>
                    <td>{leave.actionOn}</td>
                    <td>{leave.note}</td>
                    <td>
                      <button className="btn btn-link">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="table-footer">
            <div className="pagination-info">Showing 1-3 of 5 entries</div>
            <div className="pagination-controls">
              <button className="btn btn-icon" disabled>‹</button>
              <button className="btn btn-icon">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>  
    </div>
  )
}
