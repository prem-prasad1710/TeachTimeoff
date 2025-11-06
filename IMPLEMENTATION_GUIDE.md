# 🚀 TechTimeOff - Complete Implementation Guide

## What's New?

### ✨ Enhanced Login Page
- **Role Selector**: Beautiful 2x2 grid to select your role before login
  - 👨‍🏫 Faculty
  - 👔 Coordinator
  - 👨‍💼 Chief Coordinator
  - 🎓 Principal
- **Visual Feedback**: Selected role highlights with gradient and animation
- **Role Validation**: System verifies the selected role matches user's account

### 🔐 Complete Backend API
- **Real Database**: MongoDB for persistent data storage
- **Secure Authentication**: JWT tokens with bcrypt password hashing
- **RESTful API**: Complete endpoints for auth, users, and leave management
- **Role-Based Access**: Different permissions for each role

## Quick Start

### Option 1: Automatic Setup (Recommended)

1. **Start Backend** (Terminal 1):
```bash
cd backend
./start.sh
```

2. **Start Frontend** (Terminal 2):
```bash
npm run dev
```

### Option 2: Manual Setup

1. **Install MongoDB** (if not installed):
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

2. **Setup Backend**:
```bash
cd backend
npm install
node seed.js  # Creates test users
npm run dev   # Starts server on port 5000
```

3. **Start Frontend**:
```bash
# In root directory
npm run dev   # Starts on port 5173
```

## Test the System

### 1. Open the Application
Navigate to: `http://localhost:5173`

### 2. Login with Test Accounts

#### Faculty Account
- Select role: **Faculty** 👨‍🏫
- Email: `faculty@jims.edu`
- Password: `faculty123`
- Access: Personal dashboard with leave management

#### Coordinator Account
- Select role: **Coordinator** 👔
- Email: `coordinator@jims.edu`
- Password: `coord123`
- Access: Team management and approval dashboard

#### Chief Coordinator Account
- Select role: **Chief Coordinator** 👨‍💼
- Email: `chief@jims.edu`
- Password: `chief123`
- Access: Multi-department oversight dashboard

#### Principal Account
- Select role: **Principal** 🎓
- Email: `principal@jims.edu`
- Password: `principal123`
- Access: Institution-wide analytics dashboard

## Architecture Overview

```
TechTimeOff/
├── backend/                    # Node.js/Express API
│   ├── models/                # MongoDB models
│   │   ├── User.js           # User schema with roles
│   │   └── Leave.js          # Leave request schema
│   ├── routes/               # API endpoints
│   │   ├── auth.js          # Login, register, me
│   │   ├── users.js         # User CRUD operations
│   │   └── leaves.js        # Leave management
│   ├── middleware/          
│   │   └── auth.js          # JWT verification
│   ├── seed.js              # Database seeding
│   ├── server.js            # Express app
│   ├── .env                 # Configuration
│   └── package.json
│
├── src/                       # React Frontend
│   ├── pages/                # Page components
│   │   ├── Login.jsx         # Enhanced with role selector
│   │   ├── FacultyDashboard.jsx
│   │   ├── CoordinatorDashboard.jsx
│   │   ├── ChiefCoordinatorDashboard.jsx
│   │   └── PrincipalDashboard.jsx
│   ├── utils/
│   │   ├── auth.js           # Old local auth (backup)
│   │   └── api-auth.js       # New API integration
│   └── components/
│
└── package.json              # Frontend dependencies
```

## API Endpoints

### Authentication
```
POST /api/auth/register       # Register new user
POST /api/auth/login          # Login with role validation
GET  /api/auth/me             # Get current user
```

### Users
```
GET  /api/users               # Get all users
GET  /api/users/:id           # Get specific user
PUT  /api/users/:id           # Update user profile
```

### Leave Management
```
POST   /api/leaves            # Submit leave request
GET    /api/leaves            # Get leave requests
GET    /api/leaves/:id        # Get specific leave
PUT    /api/leaves/:id/approve  # Approve (coordinator+)
PUT    /api/leaves/:id/reject   # Reject (coordinator+)
DELETE /api/leaves/:id        # Cancel own request
```

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum['faculty', 'coordinator', 'chief_coordinator', 'principal'],
  department: String,
  employeeId: String (unique),
  phoneNumber: String,
  profileImage: String,
  leaveBalance: {
    casualLeave: Number,
    earnedLeave: Number,
    marriageLeave: Number,
    sickLeave: Number,
    maternityLeave: Number,
    paternityLeave: Number
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Leaves Collection
```javascript
{
  user: ObjectId (ref: User),
  leaveType: String,
  startDate: Date,
  endDate: Date,
  numberOfDays: Number,
  reason: String,
  status: Enum['Pending', 'Approved', 'Rejected', 'Cancelled'],
  approvedBy: ObjectId (ref: User),
  approverName: String,
  actionDate: Date,
  rejectionReason: String,
  attachment: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Features by Role

### 👨‍🏫 Faculty
- View personal leave balance
- Submit leave requests
- View leave history
- Update profile
- Track request status

### 👔 Coordinator
- All faculty features +
- View team member requests
- Approve/reject leave requests
- View department statistics
- Monitor team leave usage

### 👨‍💼 Chief Coordinator
- All coordinator features +
- Multi-department oversight
- Institution-wide statistics
- Critical approval handling
- Department performance tracking

### 🎓 Principal
- All chief coordinator features +
- Executive dashboard
- Advanced analytics
- High-priority approvals
- Institution metrics

## Security Features

✅ **Password Hashing**: Bcrypt with salt rounds
✅ **JWT Tokens**: Secure authentication with 7-day expiry
✅ **Role Validation**: Server-side role verification
✅ **Input Validation**: Express-validator on all inputs
✅ **CORS Protection**: Configured for frontend origin
✅ **Error Handling**: Secure error messages
✅ **Token Verification**: Middleware on protected routes

## Development Workflow

### Adding New Users
```bash
# Option 1: Via seed script
node backend/seed.js

# Option 2: Via API
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New User",
    "email": "user@jims.edu",
    "password": "password123",
    "role": "faculty",
    "department": "Computer Science"
  }'
```

### Testing API
```bash
# Login and get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "faculty@jims.edu",
    "password": "faculty123",
    "role": "faculty"
  }'

# Use token for authenticated requests
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/auth/me
```

### Database Management
```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use techtimeoff

# View collections
show collections

# Query users
db.users.find().pretty()

# Query leaves
db.leaves.find().pretty()

# Drop database (careful!)
db.dropDatabase()
```

## Troubleshooting

### Backend won't start
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB
brew services start mongodb-community@7.0

# Check if port 5000 is available
lsof -ti:5000 | xargs kill -9
```

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Ensure API_URL in `src/utils/api-auth.js` is correct

### Login fails with "Invalid token"
- Clear browser localStorage
- Logout and login again
- Check JWT_SECRET hasn't changed in `.env`

### MongoDB connection error
```bash
# Create data directory
mkdir -p ~/data/db

# Start MongoDB with specific data path
mongod --dbpath ~/data/db
```

## Production Deployment

### Backend (Render/Railway/Heroku)
1. Set environment variables in hosting platform
2. Use MongoDB Atlas for database
3. Update MONGODB_URI with Atlas connection string
4. Set strong JWT_SECRET
5. Deploy backend code

### Frontend (Vercel/Netlify)
1. Update API_URL to production backend URL
2. Build project: `npm run build`
3. Deploy dist folder
4. Configure environment variables

### MongoDB Atlas Setup
1. Create free cluster at mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for development)
4. Get connection string
5. Update MONGODB_URI in backend .env

## Next Steps

### Immediate Improvements
- [ ] Add profile image upload functionality
- [ ] Implement leave request creation from frontend
- [ ] Add real-time notifications
- [ ] Email notifications for approvals
- [ ] Calendar integration

### Future Enhancements
- [ ] Two-factor authentication
- [ ] OAuth integration (GitHub, Google)
- [ ] Advanced reporting and analytics
- [ ] Export data as PDF/Excel
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Attendance integration
- [ ] Holiday calendar management

## Support & Documentation

- **Backend Setup**: See `backend/SETUP.md`
- **API Documentation**: See `backend/API.md` (to be created)
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/

---

## 🎉 Congratulations!

You now have a fully functional leave management system with:
- ✅ Beautiful role-based login
- ✅ Real database storage
- ✅ Secure authentication
- ✅ Complete backend API
- ✅ 4 role-specific dashboards

**Enjoy your TechTimeOff system!** 🚀
