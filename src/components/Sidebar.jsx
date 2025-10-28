import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <img src="https://i.pravatar.cc/80?img=12" style={{width:44,height:44,borderRadius:8}}/>
        <div>
          <div style={{fontWeight:700}}>Kritika Yadav</div>
          <div style={{fontSize:12,opacity:0.85}}>Assistant Professor</div>
        </div>
      </div>

      <div className="nav-section">
        <NavLink to="/dashboard" className={({isActive})=> isActive? 'active':''}>
          <span className="icon">🏠</span>
          Dashboard
        </NavLink>
        <NavLink to="/profile" className={({isActive})=> isActive? 'active':''}>
          <span className="icon">👤</span>
          Profile
        </NavLink>
        <a href="#">📄 Leave Requests</a>
        <a href="#">📊 Leave Balance</a>
        <a href="#">📅 Holidays</a>
        <a href="#">⏻ Logout</a>
      </div>
    </aside>
  )
}
