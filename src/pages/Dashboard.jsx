import React from 'react'
import DashboardChart from '../components/DashboardChart'

const recent = [
  {id:1, name:'Alice', type:'CL', reason:'Vacation', start:'12-Jan-2024', end:'15-Jan-2024', status:'Approved'},
  {id:2, name:'Bob', type:'ML', reason:'Sickness', start:'05-Sep-2023', end:'07-Sep-2023', status:'Pending'},
  {id:3, name:'Carol', type:'EL', reason:'Seminar', start:'20-Jul-2023', end:'21-Jul-2023', status:'Approved'},
]

export default function Dashboard(){
  const [profile, setProfile] = React.useState({ name: 'kritika', email: 'kritika.yadav@jims.edu', department: 'Computer Applications' })
  const [showDrawer, setShowDrawer] = React.useState(false)
  const [form, setForm] = React.useState({ type:'', reason:'', start:'', end:'' })

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('profileUser')
      if (raw) setProfile(JSON.parse(raw))
    } catch (err) {}
  }, [])

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    console.log('Leave request submitted:', form)
    alert('Request submitted successfully!')
    setShowDrawer(false)
  }

  return (
    <div>
      <div className="page-title">
        <div>
          <h2 style={{margin:0}}>Welcome, {profile.name.split(' ')[0] || profile.name}</h2>
          <div style={{color:'var(--muted)'}}>Faculty Dashboard</div>
        </div>
        <button className="btn btn-primary" onClick={()=>setShowDrawer(true)}>Request Leave</button>
      </div>

      <div className="grid-2">
        <div>
          <div className="profile-card">
            <img src="https://i.pravatar.cc/150?img=12" alt="avatar" />
            <div className="profile-meta">
              <div className="title">{profile.name}</div>
              <div className="muted">{profile.email}</div>
              <div style={{marginTop:8}}>{profile.department || 'Computer Applications'} — Assistant Professor</div>
            </div>
            <div style={{marginLeft:'auto'}}>
              <button className="btn btn-ghost">Profile</button>
            </div>
          </div>

          <div className="history-card" style={{marginTop:16}}>
            <div style={{fontWeight:700,marginBottom:8}}>Leave History</div>
            <table className="history-table">
              <thead>
                <tr><th>Type</th><th>Reason</th><th>Start Date</th><th>End Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {recent.map(r=> (
                  <tr key={r.id}>
                    <td>{r.type}</td>
                    <td>{r.reason}</td>
                    <td>{r.start}</td>
                    <td>{r.end}</td>
                    <td style={{color: r.status==='Approved'? '#10b981' : r.status==='Pending'? '#f59e0b' : '#ef4444'}}>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="right-summary">
          <div className="summary-card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontWeight:700}}>Leave Summary</div>
              <div style={{color:'var(--muted)',fontSize:13}}>Year</div>
            </div>
            <div style={{marginTop:12}}>
              <div className="summary-row"><div className="summary-title">CL</div><div className="summary-value">4</div></div>
              <div className="summary-row"><div className="summary-title">EL</div><div className="summary-value">8</div></div>
              <div className="summary-row"><div className="summary-title">ML</div><div className="summary-value">2</div></div>
            </div>
          </div>

          <div className="upcoming-card">
            <div style={{fontWeight:700}}>Upcoming Leave</div>
            <div style={{marginTop:10}}>
              <div className="upcoming-item"><div>CL</div><div>16-Mar-2024 — 18-Mar-2024</div></div>
              <div className="upcoming-item"><div>- Vacation</div></div>
            </div>
          </div>
        </aside>
      </div>

      <div className="content-row">
        <div style={{width: '100%'}}>
          <DashboardChart />
        </div>
      </div>

      {showDrawer && (
        <div className="drawer-backdrop" onClick={()=>setShowDrawer(false)}>
          <div className="drawer" onClick={e=>e.stopPropagation()}>
            <h3>Request Leave</h3>
            <label>Leave Type</label>
            <select name="type" value={form.type} onChange={handleChange} style={{padding:'8px',marginBottom:'10px'}}>
              <option value="">Select</option>
              <option value="CL">CL</option>
              <option value="EL">EL</option>
              <option value="ML">ML</option>
            </select>

            <label>Reason</label>
            <input name="reason" value={form.reason} onChange={handleChange} placeholder="Enter reason" style={{padding:'8px',marginBottom:'10px'}} />

            <label>Start Date</label>
            <input type="date" name="start" value={form.start} onChange={handleChange} style={{padding:'8px',marginBottom:'10px'}} />

            <label>End Date</label>
            <input type="date" name="end" value={form.end} onChange={handleChange} style={{padding:'8px',marginBottom:'10px'}} />

            <div className="drawer-footer">
              <button className="btn btn-ghost" onClick={()=>setShowDrawer(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
