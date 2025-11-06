# Login & Role-Based Authentication Implementation Guide

## Overview
Your TechTimeOff system now has a fully functional login page with role-based authentication for 4 user types:
1. **Faculty** (Default)
2. **Coordinator**
3. **Chief Coordinator**
4. **Principal**

## What's Been Implemented

### 1. Authentication System (`src/utils/auth.js`)
- User authentication with email/password
- Session management using localStorage
- Role-based access control
- Default test credentials for all 4 roles

### 2. Login Page (`src/pages/Login.jsx`)
- Beautiful gradient UI matching the screenshot
- Email/password authentication
- GitHub & Google OAuth buttons (UI only, for future implementation)
- Remember me checkbox
- Password visibility toggle
- Test credentials displayed for easy access

### 3. Role-Based Dashboards

#### Faculty Dashboard (`src/pages/FacultyDashboard.jsx`)
- Personal leave summary with circular progress indicators
- Leave balance cards with detailed information
- Leave history table with filters
- Profile section with uploaded image support

#### Coordinator Dashboard (`src/pages/CoordinatorDashboard.jsx`)
- Team statistics (Total Faculty, On Leave, Pending Requests)
- Department leave overview
- Pending approvals table with Approve/Reject buttons
- Manage team leave requests

#### Chief Coordinator Dashboard (`src/pages/ChiefCoordinatorDashboard.jsx`)
- Institution-wide statistics with gradient cards
- Department overview table
- Critical approvals section
- Multi-department management

#### Principal Dashboard (`src/pages/PrincipalDashboard.jsx`)
- Executive-level metrics (Total Faculty, Departments, etc.)
- Department performance analytics with utilization bars
- High priority approvals
- Institution-wide leave analytics

### 4. Updated App Routing (`src/App.jsx`)
- Protected routes with role-based access control
- Automatic redirection to appropriate dashboard
- Login page integration
- Shared routes for Profile and Leave Balance

### 5. Updated Header (`src/components/Header.jsx`)
- Display current user's name and role
- Logout button with smooth transition
- Role-specific labels

## Test Credentials

### Faculty
- Email: `faculty@jims.edu`
- Password: `faculty123`
- Redirects to: `/faculty/dashboard`

### Coordinator
- Email: `coordinator@jims.edu`
- Password: `coord123`
- Redirects to: `/coordinator/dashboard`

### Chief Coordinator
- Email: `chief@jims.edu`
- Password: `chief123`
- Redirects to: `/chief-coordinator/dashboard`

### Principal
- Email: `principal@jims.edu`
- Password: `principal123`
- Redirects to: `/principal/dashboard`

## How It Works

### Login Flow
1. User visits `/login` and enters credentials
2. System validates against default users in `auth.js`
3. On success, user data is stored in localStorage
4. User is redirected to their role-specific dashboard
5. Protected routes verify authentication and role

### Protected Routes
- All dashboard routes are protected
- Users must be authenticated to access any dashboard
- Users can only access dashboards matching their role
- Attempting to access wrong dashboard redirects to correct one

### Logout Flow
1. User clicks "Logout" button in header
2. User session is cleared from localStorage
3. User is redirected to login page
4. All protected routes become inaccessible

## Features by Role

### Faculty
- View personal leave balance
- Request new leave
- View leave history
- Manage profile

### Coordinator
- View team statistics
- Approve/reject team leave requests
- Monitor department leave usage
- View faculty leave balances

### Chief Coordinator
- Oversee multiple departments
- View institution-wide statistics
- Handle escalated approvals
- Monitor coordinator performance

### Principal
- Executive dashboard with analytics
- Review high-priority approvals
- Monitor institutional metrics
- Department performance tracking

## Data Storage

Currently, all data is stored in:
- **localStorage** for user sessions
- **Component state** for dashboard data (hardcoded for demo)

### Future Enhancement
To make it fully functional with real data:
1. Set up a backend API (Node.js, Python Flask/Django, etc.)
2. Connect to a database (MongoDB, PostgreSQL, MySQL)
3. Replace hardcoded data with API calls
4. Implement real OAuth (GitHub, Google)
5. Add JWT tokens for secure authentication

## Customization

### Adding New Users
Edit `src/utils/auth.js` and add to `DEFAULT_USERS` array:
```javascript
{
  email: 'newuser@jims.edu',
  password: 'password123',
  role: 'faculty', // or coordinator, chief_coordinator, principal
  name: 'User Name',
  department: 'Department Name'
}
```

### Modifying Dashboard Data
Each dashboard file contains hardcoded data in component state. Edit the respective dashboard file to modify:
- Statistics
- Leave types
- Approval requests
- Department information

### Styling
The login page uses inline styles matching the screenshot. You can:
- Modify colors in the gradient backgrounds
- Adjust spacing and padding
- Change fonts and sizes
- Add custom animations

## Next Steps for Full Implementation

1. **Backend Setup**
   - Create REST API endpoints
   - Set up database schema
   - Implement authentication middleware

2. **Database Integration**
   - Store user credentials securely (hashed passwords)
   - Save leave requests and approvals
   - Track leave balances and history

3. **Real-time Features**
   - WebSocket for instant notifications
   - Real-time approval updates
   - Live dashboard statistics

4. **Enhanced Security**
   - JWT token-based authentication
   - Refresh tokens
   - Password hashing (bcrypt)
   - CSRF protection

5. **Additional Features**
   - Email notifications
   - Calendar integration
   - PDF leave application generation
   - Advanced reporting and analytics

## File Structure
```
src/
├── utils/
│   └── auth.js                      # Authentication utilities
├── pages/
│   ├── Login.jsx                    # Login page
│   ├── FacultyDashboard.jsx         # Faculty dashboard
│   ├── CoordinatorDashboard.jsx     # Coordinator dashboard
│   ├── ChiefCoordinatorDashboard.jsx# Chief coordinator dashboard
│   ├── PrincipalDashboard.jsx       # Principal dashboard
│   ├── Profile.jsx                  # User profile (shared)
│   └── LeaveBalance.jsx             # Leave balance (shared)
├── components/
│   ├── Header.jsx                   # Updated with logout
│   ├── Sidebar.jsx                  # Navigation sidebar
│   └── ...
└── App.jsx                          # Main app with routing
```

## Running the Application

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Navigate to `http://localhost:5173` (or your configured port)

4. You'll be redirected to `/login`

5. Use any test credentials to log in

6. Explore the role-specific dashboards!

## Troubleshooting

**Issue: Can't access dashboards**
- Solution: Make sure you're logged in. Check localStorage for `currentUser` key.

**Issue: Wrong dashboard showing**
- Solution: Logout and login again with correct credentials.

**Issue: Login not working**
- Solution: Verify credentials match those in `src/utils/auth.js`.

**Issue: Redirecting to login constantly**
- Solution: Clear localStorage and try again.

## Support

For questions or issues:
1. Check the console for errors
2. Verify all files are created correctly
3. Ensure imports are correct
4. Clear browser cache and localStorage

---

**Enjoy your new role-based leave management system!** 🎉
