import React, { useState, useRef, useEffect } from 'react'

export default function Profile(){
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [editValues, setEditValues] = useState({});
  
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Teacher',
    department: 'Mathematics',
    joiningDate: '2020-09-01',
    qualification: 'M.Sc. Mathematics',
    specialization: 'Advanced Calculus',
    phone: '+1 234-567-8900',
    gender: 'Female'
  });

  const balances = [
    {type:'Casual', days:6},
    {type:'Sick', days:4},
    {type:'Earned', days:2}
  ]

  const calculateExperience = (joiningDate) => {
    const join = new Date(joiningDate);
    const today = new Date();
    const diffYears = today.getFullYear() - join.getFullYear();
    const diffMonths = today.getMonth() - join.getMonth();
    return `${diffYears} years ${diffMonths} months`;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click();
  }

  const toggleEdit = (field) => {
    if (!editMode[field]) {
      // Starting to edit - set the initial edit value
      setEditValues(prev => ({
        ...prev,
        [field]: user[field]
      }));
    } else {
      // Finishing edit - save the value
      setUser(prev => ({
        ...prev,
        [field]: editValues[field]
      }));
    }
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChange = (field, value) => {
    setEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const EditableField = ({ label, value, field }) => {
    const inputRef = useRef(null);

    useEffect(() => {
      if (editMode[field] && inputRef.current) {
        inputRef.current.focus();
      }
    }, [editMode[field]]);

    return (
      <div style={{
        padding: '12px 0',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1, marginRight: '16px' }}>
          <div style={{color: 'var(--muted)', fontSize: '0.9em'}}>{label}</div>
          {editMode[field] ? (
            <input
              ref={inputRef}
              type="text"
              value={editValues[field] || value}
              onChange={(e) => handleChange(field, e.target.value)}
              style={{
                padding: '4px 8px',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                fontSize: '1em',
                width: '100%',
                maxWidth: '300px'
              }}
            />
          ) : (
            <div>{value}</div>
          )}
        </div>
        <button
          onClick={() => toggleEdit(field)}
          style={{
            padding: '4px 12px',
            border: 'none',
            background: 'none',
            color: '#2874f0',
            cursor: 'pointer',
            fontSize: '0.9em',
            whiteSpace: 'nowrap'
          }}
        >
          {editMode[field] ? 'Save' : 'Edit'}
        </button>
      </div>
    );
  };

  return (
    <div className="profile-container" style={{maxWidth: '800px', margin: '0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
        <h2 style={{margin:0}}>My Profile</h2>
      </div>

      {/* Personal Information Section */}
      <div className="card" style={{marginBottom:'24px', padding: '24px'}}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{margin:0}}>Personal Information</h3>
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'flex-start'}}>
          <div className="profile-image-container" style={{position:'relative'}}>
            <div 
              className="profile-image" 
              style={{
                width:'150px',
                height:'150px',
                borderRadius:'50%',
                overflow:'hidden',
                border:'2px solid var(--border)',
                position:'relative'
              }}
            >
              {profileImage ? 
                <img src={profileImage} alt="Profile" style={{width:'100%',height:'100%',objectFit:'cover'}} /> :
                <div className="avatar" style={{width:'100%',height:'100%',fontSize:'48px'}}>{user.name.split(' ').map(n => n[0]).join('')}</div>
              }
            </div>
            <button 
              onClick={triggerFileInput} 
              style={{
                position:'absolute',
                bottom:'0',
                right:'0',
                padding:'8px',
                borderRadius:'50%',
                background:'#60a5fa',
                border:'none',
                cursor:'pointer'
              }}
            >
              <span role="img" aria-label="change photo">📷</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{display:'none'}}
            />
          </div>
          
          <div className="profile-details" style={{flex:1}}>
            <EditableField
              label="Full Name"
              value={user.name}
              field="name"
            />
            <EditableField
              label="Email Address"
              value={user.email}
              field="email"
            />
            <EditableField
              label="Mobile Number"
              value={user.phone}
              field="phone"
            />
            <div style={{
              padding: '12px 0',
              borderBottom: '1px solid var(--border)'
            }}>
              <div style={{color: 'var(--muted)', fontSize: '0.9em'}}>Gender</div>
              <div style={{display: 'flex', gap: '20px', marginTop: '8px'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={user.gender === 'Male'}
                    onChange={(e) => handleChange('gender', e.target.value)}
                  />
                  Male
                </label>
                <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={user.gender === 'Female'}
                    onChange={(e) => handleChange('gender', e.target.value)}
                  />
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information Section */}
      <div className="card" style={{marginBottom:'24px', padding: '24px'}}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{margin:0}}>Professional Information</h3>
        </div>
        <div>
          <EditableField
            label="Department"
            value={user.department}
            field="department"
          />
          <EditableField
            label="Role"
            value={user.role}
            field="role"
          />
          <EditableField
            label="Qualification"
            value={user.qualification}
            field="qualification"
          />
          <EditableField
            label="Specialization"
            value={user.specialization}
            field="specialization"
          />
          <EditableField
            label="Joining Date"
            value={user.joiningDate}
            field="joiningDate"
          />
          <div style={{padding: '12px 0', borderBottom: '1px solid var(--border)'}}>
            <div style={{color: 'var(--muted)', fontSize: '0.9em'}}>Experience</div>
            <div>{calculateExperience(user.joiningDate)}</div>
          </div>
        </div>
      </div>

      {/* Leave Balances Section */}
      <div className="card">
        <h3 style={{marginTop:0}}>Leave Balances</h3>
        <div className="leaves-grid" style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'16px'}}>
          {balances.map(b=> (
            <div className="leave-balance" key={b.type} style={{padding:'16px',background:'var(--background)',borderRadius:'8px'}}>
              <div style={{color:'var(--muted)'}}>{b.type}</div>
              <div style={{fontSize:20,fontWeight:800}}>{b.days} days</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
