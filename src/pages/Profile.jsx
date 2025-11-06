import React, { useState, useRef, useEffect } from 'react'
import { getCurrentUser, updateUserProfile, fetchCurrentUser } from '../utils/api-auth'

export default function Profile() {
  const fileInputRef = useRef(null)
  const [profileImage, setProfileImage] = useState(null)
  const [editMode, setEditMode] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    joiningDate: '',
    qualification: '',
    specialization: '',
    phone: '',
    gender: '',
    employeeId: '',
    phoneNumber: ''
  })

  const balances = [
    { type: 'Casual', days: 6 },
    { type: 'Sick', days: 4 },
    { type: 'Earned', days: 2 }
  ]

  // Load user data from API on component mount
  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      setLoading(true)
      const currentUser = getCurrentUser()
      
      if (currentUser) {
        // Fetch latest data from API
        const userData = await fetchCurrentUser()
        
        if (userData) {
          setUser({
            name: userData.name || '',
            email: userData.email || '',
            role: userData.role || '',
            department: userData.department || '',
            phone: userData.phoneNumber || userData.phone || '',
            employeeId: userData.employeeId || '',
            gender: userData.gender || '',
            qualification: userData.qualification || '',
            specialization: userData.specialization || '',
            joiningDate: userData.joiningDate || new Date().toISOString().split('T')[0]
          })
          
          // Load profile image
          if (userData.profileImage) {
            setProfileImage(userData.profileImage)
          } else {
            // Check localStorage for backward compatibility
            const savedImage = localStorage.getItem('profileImage')
            if (savedImage) setProfileImage(savedImage)
          }
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      showMessage('error', 'Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const calculateExperience = (joiningDate) => {
    try {
      const join = new Date(joiningDate)
      const today = new Date()
      let years = today.getFullYear() - join.getFullYear()
      let months = today.getMonth() - join.getMonth()
      if (months < 0) {
        years -= 1
        months += 12
      }
      return `${years} years ${months} months`
    } catch (err) {
      return '-'
    }
  }

  // Image handling: resize+compress before saving
  const handleImageChange = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onloadend = async () => {
      const img = new Image()
      img.onload = async () => {
        const MAX_WIDTH = 800
        const MAX_HEIGHT = 800
        let { width, height } = img
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
        
        // Save to state and localStorage immediately for UI feedback
        setProfileImage(dataUrl)
        try {
          localStorage.setItem('profileImage', dataUrl)
        } catch (err) {
          console.error('localStorage error:', err)
        }
        
        // Save to database
        try {
          const currentUser = getCurrentUser()
          if (currentUser && currentUser.id) {
            setSaving(true)
            await updateUserProfile(currentUser.id, { profileImage: dataUrl })
            showMessage('success', 'Profile image updated successfully!')
          }
        } catch (error) {
          console.error('Error saving image:', error)
          showMessage('error', 'Failed to save profile image')
        } finally {
          setSaving(false)
        }
      }
      img.onerror = () => {
        // fallback: store raw result
        try {
          setProfileImage(reader.result)
          localStorage.setItem('profileImage', reader.result)
        } catch (err) {}
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const removeProfileImage = async () => {
    setProfileImage(null)
    try { 
      localStorage.removeItem('profileImage') 
      
      // Remove from database
      const currentUser = getCurrentUser()
      if (currentUser && currentUser.id) {
        setSaving(true)
        await updateUserProfile(currentUser.id, { profileImage: null })
        showMessage('success', 'Profile image removed')
      }
    } catch (err) {
      showMessage('error', 'Failed to remove profile image')
    } finally {
      setSaving(false)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  // editing helpers: only one field editable at a time
  const startEdit = (field) => setEditMode({ [field]: true })
  
  const saveField = async (field, value) => {
    try {
      setSaving(true)
      
      // Update local state immediately for UI responsiveness
      setUser((prev) => {
        const next = { ...prev, [field]: value }
        try {
          localStorage.setItem('profileUser', JSON.stringify(next))
        } catch (err) {}
        return next
      })
      
      // Save to database
      const currentUser = getCurrentUser()
      if (currentUser && currentUser.id) {
        // Map field names to API field names
        const apiFieldMap = {
          name: 'name',
          phone: 'phoneNumber',
          department: 'department',
          qualification: 'qualification',
          specialization: 'specialization',
          gender: 'gender',
          joiningDate: 'joiningDate'
        }
        
        const apiField = apiFieldMap[field] || field
        await updateUserProfile(currentUser.id, { [apiField]: value })
        showMessage('success', `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`)
      }
      
      setEditMode({})
    } catch (error) {
      console.error('Error saving field:', error)
      showMessage('error', `Failed to update ${field}`)
    } finally {
      setSaving(false)
    }
  }

  // persist user on change (catch-all)
  useEffect(() => {
    try {
      localStorage.setItem('profileUser', JSON.stringify(user))
    } catch (err) {}
  }, [user])

  const EditableField = ({ label, value, field }) => {
    const inputRef = useRef(null)
    const [inputValue, setInputValue] = useState(value ?? '')

    useEffect(() => {
      if (editMode[field]) setInputValue(value ?? '')
    }, [editMode[field]])

    useEffect(() => {
      if (editMode[field] && inputRef.current) {
        inputRef.current.focus()
        const v = inputRef.current.value
        inputRef.current.setSelectionRange(v.length, v.length)
      }
    }, [editMode[field]])

    return (
      <div
        style={{
          padding: '12px 0',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ flex: 1, marginRight: '16px' }}>
          <div style={{ color: 'var(--muted)', fontSize: '0.9em' }}>{label}</div>
          {editMode[field] ? (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={() => saveField(field, inputValue)}
              style={{
                padding: '6px 8px',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                fontSize: '1em',
                width: '100%',
                maxWidth: '360px'
              }}
            />
          ) : (
            <div>{value}</div>
          )}
        </div>
        <button
          onClick={() => {
            if (editMode[field]) saveField(field, inputValue)
            else startEdit(field)
          }}
          style={{
            padding: '6px 12px',
            border: 'none',
            background: 'none',
            color: '#2874f0',
            cursor: 'pointer',
            fontSize: '0.95em',
            whiteSpace: 'nowrap'
          }}
        >
          {editMode[field] ? 'Save' : 'Edit'}
        </button>
      </div>
    )
  }

  return (
    <div className="profile-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>My Profile</h2>
        {saving && (
          <div style={{ color: '#667eea', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
            Saving...
          </div>
        )}
      </div>

      {/* Success/Error Message */}
      {message.text && (
        <div style={{
          padding: '12px 16px',
          marginBottom: '16px',
          borderRadius: '8px',
          background: message.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: message.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${message.type === 'success' ? '#6ee7b7' : '#fca5a5'}`,
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
          {message.text}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <div style={{ color: '#6b7280' }}>Loading profile...</div>
        </div>
      ) : (
        <>
          {/* Personal Information Section */}
          <div className="card" style={{ marginBottom: '32px', padding: '32px', minHeight: '400px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px'
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Personal Information</h3>
            </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div className="profile-image-container" style={{ position: 'relative' }}>
            <div
              className="profile-image"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--border)',
                position: 'relative'
              }}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="avatar" style={{ width: '100%', height: '100%', fontSize: '48px' }}>{user.name.split(' ').map(n => n[0]).join('')}</div>
              )}
            </div>
            <div style={{ position: 'absolute', bottom: '6px', right: '6px', display: 'flex', gap: '8px' }}>
              <button
                onClick={triggerFileInput}
                title="Change photo"
                style={{
                  padding: '8px',
                  borderRadius: '50%',
                  background: '#60a5fa',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span role="img" aria-label="change photo">📷</span>
              </button>
              {profileImage && (
                <button
                  onClick={removeProfileImage}
                  title="Remove photo"
                  style={{
                    padding: '8px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#fff'
                  }}
                >
                  ✖
                </button>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
          </div>

          <div className="profile-details" style={{ flex: 1, marginTop: '12px' }}>
            <EditableField label="Full Name" value={user.name} field="name" />
            <EditableField label="Email Address" value={user.email} field="email" />
            <EditableField label="Mobile Number" value={user.phone} field="phone" />
            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--muted)', fontSize: '0.9em' }}>Gender</div>
              <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="radio" name="gender" value="Male" checked={user.gender === 'Male'} onChange={(e) => setUser(prev => ({ ...prev, gender: e.target.value }))} />
                  Male
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="radio" name="gender" value="Female" checked={user.gender === 'Female'} onChange={(e) => setUser(prev => ({ ...prev, gender: e.target.value }))} />
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information Section */}
      <div className="card" style={{ marginBottom: '32px', padding: '32px', minHeight: '400px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Professional Information</h3>
        </div>
        <div>
          <EditableField label="Department" value={user.department} field="department" />
          <EditableField label="Role" value={user.role} field="role" />
          <EditableField label="Qualification" value={user.qualification} field="qualification" />
          <EditableField label="Specialization" value={user.specialization} field="specialization" />
          <EditableField label="Joining Date" value={user.joiningDate} field="joiningDate" />
          <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ color: 'var(--muted)', fontSize: '0.9em' }}>Experience</div>
            <div>{calculateExperience(user.joiningDate)}</div>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  )
}