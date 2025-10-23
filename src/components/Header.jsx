import React from 'react'

export default function Header({onOpenRequest}){
  return (
    <div className="topbar">
      <div className="brand">
        <div className="logo">TT</div>
        <div>
          <div style={{fontWeight:700}}>TeachTimeOff</div>
          <div style={{fontSize:12,color:'var(--muted)'}}>Leave Approval Management</div>
        </div>
      </div>

      <div className="top-right">
        <button className="btn btn-ghost" onClick={onOpenRequest}>Request Leave</button>
        <div className="top-user">
          <div style={{textAlign:'right'}}>
            <div className="name">Dr. Himanshu Gola</div>
            <div style={{fontSize:12,color:'var(--muted)'}}>Admin</div>
          </div>
          <img src="https://i.pravatar.cc/100?img=12" alt="avatar" />
        </div>
      </div>
    </div>
  )
}
