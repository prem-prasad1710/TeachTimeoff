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
  const [profileImage, setProfileImage] = React.useState(null)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('profileUser')
      if (raw) setProfile(JSON.parse(raw))
      const img = localStorage.getItem('profileImage')
      if (img) setProfileImage(img)
    } catch (err) {
      // ignore
    }
  }, [])

  return (
    <div className="dashboard-layout" style={{ background: '#f7f7f7', minHeight: '100vh', padding: '32px' }}>
      {/* Welcome Header */}
      <div className="page-title" style={{ marginBottom: 32 }}>
        <div>
          <h2 style={{margin:0}}>Welcome, {profile.name.split(' ')[0]}</h2>
          <div style={{color:'var(--muted)'}}>Faculty Dashboard</div>
        </div>
      </div>

      {/* Top Row: Profile Card and Leave Summary */}
      <div className="dashboard-row top" style={{ display: 'flex', gap: '32px', marginBottom: 32 }}>
        {/* Profile Card */}
        <div className="dashboard-card profile-card" style={{ flex: '0 0 340px', height: '420px', background: '#fff', borderRadius: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 220 }}>
          <img src={profileImage || profile.avatar || "https://i.pravatar.cc/150?img=12"} alt="Profile" style={{ width: 96, height: 96, borderRadius: '50%', marginBottom: 24, objectFit: 'cover' }} />
          <div className="profile-meta" style={{ textAlign: 'center' }}>
            <h2 className="profile-name" style={{ fontSize: 26, margin: 0, fontWeight: 700 }}>{profile.name}</h2>
            <p className="profile-role" style={{ margin: '8px 0', color: '#888', fontSize: 18 }}>{profile.role || 'Teacher'}</p>
            <p className="profile-dept" style={{ margin: 0, color: '#444', fontSize: 18 }}>{profile.department}</p>
          </div>
        </div>

        {/* Leave Summary (Graphical) */}
        <div className="dashboard-card" style={{ flex: 1, background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '1px 0 8px 0', minWidth: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 className="card-title" style={{ fontSize: 30, marginBottom: 12, width: '100%', textAlign: 'center', paddingLeft: 24 }}>Leave Summary</h3>
          <div className="leave-summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '18px', width: '100%', justifyItems: 'center', alignItems: 'start', padding: '0 24px', justifyContent: 'center' }}>
            {leaveTypes.map(leave => (
              <div key={leave.id} className="leave-summary-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f9f9f9', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '16px 8px', minWidth: '140px', marginBottom: 0, width: '100%' }}>
                <CircleProgress
                  percentage={(leave.available / leave.total) * 100}
                  color={leave.color}
                  size={56}
                  strokeWidth={6}
                />
                <div className="progress-info" style={{ fontWeight: 700, fontSize: 20, margin: '6px 0 2px 0', color: leave.color }}>{leave.available}</div>
                <div className="leave-details" style={{ textAlign: 'center' }}>
                  <div className="leave-name" style={{ fontWeight: 700, fontSize: 18, marginBottom: 2 }}>{leave.name}</div>
                  <div className="leave-mini-stats" style={{ fontSize: 15, color: '#444', marginTop: 2 }}>
                    <span className="stat-label">Total: <strong>{leave.total}</strong></span>
                    <span className="stat-label" style={{ marginLeft: 8 }}>Used: <strong>{leave.used}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave Balance Section */}
      <div className="dashboard-row" style={{ marginBottom: 32 }}>
        <div className="dashboard-card leave-balance-section" style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: '40px 32px', width: '100%' }}>
          <h3 className="card-title" style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, textAlign: 'center', letterSpacing: 1 }}>Leave Balance</h3>
          <div className="leave-balance-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', width: '100%' }}>
            {leaveTypes.map(type => (
              <div key={type.id} className="balance-card" style={{background:'#f9f9f9', padding:24, borderRadius:16, border:'1px solid #eee', boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontSize:20, fontWeight:700, marginBottom:4, color:'#1a2236'}}>{type.name}</div>
                    {type.available === 0 && !type.used && (
                      <div style={{fontSize:15, color:'#888'}}>No data to display</div>
                    )}
                  </div>
                  <button className="btn btn-ghost" style={{fontSize:15, border:'1px solid #ddd', borderRadius:8, padding:'6px 16px', background:'#fff', cursor:'pointer'}}>View details</button>
                </div>

                {(type.available > 0 || type.used > 0) && (
                  <>
                    <div style={{display:'flex', justifyContent:'center', margin:'20px 0'}}>
                      <CircleProgress
                        percentage={(type.available / (type.total || 1)) * 100}
                        color={type.color}
                        size={64}
                        strokeWidth={8}
                      />
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, fontSize:15}}>
                      <div>
                        <div style={{color:'#888'}}>Available</div>
                        <div style={{fontWeight:600}}>{type.available} days</div>
                      </div>
                      <div>
                        <div style={{color:'#888'}}>Consumed</div>
                        <div style={{fontWeight:600}}>{type.used} days</div>
                      </div>
                      {type.total && (
                        <div>
                          <div style={{color:'#888'}}>Annual Quota</div>
                          <div style={{fontWeight:600}}>{type.total} days</div>
                        </div>
                      )}
                      {type.accruedSoFar && (
                        <div>
                          <div style={{color:'#888'}}>Accrued so far</div>
                          <div style={{fontWeight:600}}>{type.accruedSoFar} days</div>
                        </div>
                      )}
                      {type.carryOver && (
                        <div>
                          <div style={{color:'#888'}}>Carry Over</div>
                          <div style={{fontWeight:600}}>{type.carryOver} days</div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave History Section */}
      <div className="dashboard-row">
        <div className="dashboard-card leave-history-section" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '32px' }}>
          <h3 className="card-title" style={{ fontSize: 22, marginBottom: 18 }}>Leave History section</h3>
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
                      <span className={`status-badge ${leave.status.toLowerCase()}`}>{leave.status}</span>
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
  )
}