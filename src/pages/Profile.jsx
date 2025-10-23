import React from 'react'

export default function Profile(){
  const user = {name:'Jane Doe', email:'jane.doe@example.com', role:'Manager', team:'Product'}
  const balances = [
    {type:'Casual', days:6},
    {type:'Sick', days:4},
    {type:'Earned', days:2}
  ]
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{margin:0}}>Profile</h2>
        <div style={{color:'var(--muted)'}}>Manage your personal info and leave balances</div>
      </div>

      <div className="card profile-top" style={{marginTop:12}}>
        <div className="avatar">JD</div>
        <div className="profile-info">
          <div style={{fontSize:18,fontWeight:700}}>{user.name}</div>
          <div style={{color:'var(--muted)'}}>{user.email}</div>
          <div style={{marginTop:8}}><strong>Role:</strong> {user.role} — <strong>Team:</strong> {user.team}</div>
          <div style={{marginTop:12}}>
            <button style={{padding:'8px 12px',borderRadius:8,border:'none',background:'#60a5fa',color:'#021024',fontWeight:700}}>Edit Profile</button>
          </div>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <div style={{fontWeight:700,marginBottom:8}}>Leave Balances</div>
        <div className="leaves-grid">
          {balances.map(b=> (
            <div className="leave-balance card" key={b.type}>
              <div style={{color:'var(--muted)'}}>{b.type}</div>
              <div style={{fontSize:20,fontWeight:800}}>{b.days} days</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
