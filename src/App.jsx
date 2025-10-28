import React, {useState} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import RequestDrawer from './components/RequestDrawer2'

export default function App() {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <div className="app-root">
      <Header onOpenRequest={()=>setOpenDrawer(true)} />
      <div className="app-body">
        <Sidebar />
        <main className="main-root">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
      <Footer />
      <RequestDrawer open={openDrawer} onClose={()=>setOpenDrawer(false)} />
    </div>
  )
}
