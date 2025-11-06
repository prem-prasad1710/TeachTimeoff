// Authentication utility functions

// Default users for testing
const DEFAULT_USERS = [
  {
    email: 'faculty@jims.edu',
    password: 'faculty123',
    role: 'faculty',
    name: 'Kritika Yadav',
    department: 'Computer Applications'
  },
  {
    email: 'coordinator@jims.edu',
    password: 'coord123',
    role: 'coordinator',
    name: 'Amit Bora',
    department: 'Computer Applications'
  },
  {
    email: 'chief@jims.edu',
    password: 'chief123',
    role: 'chief_coordinator',
    name: 'Dr. Rajesh Kumar',
    department: 'Administration'
  },
  {
    email: 'principal@jims.edu',
    password: 'principal123',
    role: 'principal',
    name: 'Dr. Anita Sharma',
    department: 'Principal Office'
  }
]

export const authenticateUser = (email, password) => {
  const user = DEFAULT_USERS.find(u => u.email === email && u.password === password)
  return user || null
}

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('currentUser')
    return userStr ? JSON.parse(userStr) : null
  } catch (err) {
    return null
  }
}

export const setCurrentUser = (user) => {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user))
  } catch (err) {
    console.error('Failed to save user', err)
  }
}

export const logout = () => {
  localStorage.removeItem('currentUser')
}

export const isAuthenticated = () => {
  return getCurrentUser() !== null
}

export const getUserRole = () => {
  const user = getCurrentUser()
  return user ? user.role : null
}
