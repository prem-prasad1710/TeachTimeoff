import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Sidebar({open, onClose}){
  const { user } = useAuth()
  
  // Get user display info from AuthContext (MongoDB data)
  const userName = user?.name || user?.fullName || 'User'
  const userRole = user?.role || 'faculty'
  const userEmail = user?.email || ''
  
  // Role display mapping
  const roleDisplay = {
    'faculty': 'Faculty Member',
    'coordinator': 'Coordinator',
    'chief_coordinator': 'Chief Coordinator',
    'principal': 'Principal'
  }
  
  return (
    <aside
      className="sidebar"
      style={{
        position: 'fixed',
        top: 0,
        left: open ? 0 : -240,
        height: '100vh',
        width: '240px',
        background: 'rgba(24, 41, 89, 0.98)',
        boxShadow: '2px 0 16px rgba(44,62,255,0.07)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        gap: '24px',
        backdropFilter: 'blur(2px)',
        transition: 'left 0.3s',
      }}
    >
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <img src={user?.avatar || "https://i.pravatar.cc/80?img=12"} style={{width:44,height:44,borderRadius:8}}/>
        <div>
          <div style={{fontWeight:700}}>{userName}</div>
          <div style={{fontSize:12,opacity:0.85}}>{roleDisplay[userRole]}</div>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 22,
            cursor: 'pointer',
            display: 'none',
          }}
          className="sidebar-close-btn"
          aria-label="Close sidebar"
        >×</button>
      </div>
      {/* Close button for sidebar */}
      {open && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 28,
            cursor: 'pointer',
            zIndex: 102
          }}
          aria-label="Close sidebar"
        >×</button>
      )}
      <div className="nav-section">
        <NavLink to="/dashboard" className={({isActive})=> isActive? 'active':''}>
          <span className="icon">🏠</span>
          Dashboard
        </NavLink>
        <NavLink to="/profile" className={({isActive})=> isActive? 'active':''}>
          <span className="icon">👤</span>
          Profile
        </NavLink>
        <NavLink to="/leave-balance" className={({isActive})=> isActive? 'active':''}>
          <span className="icon">📊</span>
          Leave Balance
        </NavLink>
        <a href="#">📅 Holidays</a>
        <a href="#">⏻ Logout</a>
      </div>
    </aside>
  )
}