# 🔧 Signup Issue - FIXED

## Issues Fixed:

### 1. ❌ Backend MongoDB Connection Issue
**Problem**: Backend `.env` was using local MongoDB instead of Atlas
**Solution**: Updated to MongoDB Atlas URI with URL-encoded password

### 2. ❌ "Cannot GET /" Error
**Problem**: No root route handler
**Solution**: Added welcome route at `/` showing API info

### 3. ❌ 500 Error During Registration
**Problem**: Multiple potential issues:
- Department validation was too strict
- Empty fields causing validation errors
- MongoDB connection issues

**Solutions Applied**:
- Made `department` field optional (not all roles need it)
- Added proper handling for optional fields (`employeeId`, `phoneNumber`)
- URL-encoded the password in MongoDB URI (`$` → `%24`)
- Added detailed error logging

## Changes Made:

### 1. `/backend/.env`
```env
# Updated MongoDB URI with URL-encoded password
MONGODB_URI="mongodb+srv://Prem:Prem%241710@cluster0.wv2ni.mongodb.net/techtimeoff?retryWrites=true&w=majority"
```

**Important**: The `$` in your password must be encoded as `%24` in URLs

### 2. `/backend/server.js`
- Added root route handler to prevent "Cannot GET /" error
- Shows API documentation and available endpoints

### 3. `/backend/models/User.js`
- Changed `department` from conditionally required to optional
- Added `trim: true` to `employeeId`

### 4. `/backend/routes/auth.js`
- Added comprehensive logging for debugging
- Better handling of optional fields
- Logs each step of registration process

## How to Test:

### Step 1: Stop and Restart Backend
```bash
# Stop the current backend (Ctrl+C)
cd backend
npm start
```

You should see:
```
🚀 Server is running on http://localhost:5000
📊 Environment: development
✅ MongoDB Connected Successfully
```

### Step 2: Test Root Endpoint
Open browser or use curl:
```bash
curl http://localhost:5000/
```

Expected response:
```json
{
  "message": "🚀 TechTimeOff API Server",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth (register, login, me)",
    "users": "/api/users",
    "leaves": "/api/leaves",
    "health": "/api/health"
  },
  "status": "running"
}
```

### Step 3: Test Signup Page
1. Navigate to `http://localhost:5173/signup`
2. Select a role (e.g., Faculty)
3. Fill in the form:
   - **Full Name**: John Doe
   - **Email**: john.doe@jims.edu
   - **Department**: Computer Science
   - **Employee ID**: EMP001 (optional)
   - **Phone Number**: 1234567890 (optional)
   - **Password**: password123
   - **Confirm Password**: password123
4. Click "Create Account"

### Step 4: Check Backend Logs
You should see in terminal:
```
Registration attempt: { name: 'John Doe', email: 'john.doe@jims.edu', role: 'faculty', ... }
Saving new user...
User saved successfully: [MongoDB ObjectId]
```

### Step 5: Verify in MongoDB Atlas
1. Go to MongoDB Atlas dashboard
2. Browse Collections → `techtimeoff` database → `users` collection
3. You should see the new user with hashed password

## Common Issues & Solutions:

### Issue: MongoDB Connection Error
**Symptoms**: No "✅ MongoDB Connected Successfully" message

**Solutions**:
1. Check internet connection
2. Verify MongoDB Atlas cluster is running
3. Whitelist your IP in MongoDB Atlas (Network Access)
4. Check password encoding in `.env` file

### Issue: "User already exists" Error
**Symptoms**: 400 error after signup

**Solution**: User with that email already registered. Try different email or check MongoDB Atlas.

### Issue: Validation Error
**Symptoms**: 400 error with validation messages

**Check**:
- Email format is valid
- Password is at least 6 characters
- All required fields are filled
- Role is selected

### Issue: Still Getting 500 Error
**Debug Steps**:
1. Check backend terminal for detailed error logs
2. Common causes:
   - MongoDB not connected
   - Unique constraint violation (email/employeeId already exists)
   - Missing required fields

## Testing the Complete Flow:

### Test 1: Faculty Signup
```javascript
// Data to send
{
  "name": "Test Faculty",
  "email": "test.faculty@jims.edu",
  "password": "test123",
  "role": "faculty",
  "department": "Computer Science",
  "employeeId": "FAC001",
  "phoneNumber": "1234567890"
}
```

### Test 2: Coordinator Signup
```javascript
{
  "name": "Test Coordinator",
  "email": "test.coord@jims.edu",
  "password": "test123",
  "role": "coordinator",
  "department": "Engineering"
}
```

### Test 3: Principal Signup (No Department Required)
```javascript
{
  "name": "Test Principal",
  "email": "test.principal@jims.edu",
  "password": "test123",
  "role": "principal"
}
```

## Next Steps After Successful Signup:

1. ✅ User is automatically logged in
2. ✅ JWT token stored in localStorage
3. ✅ Redirected to role-appropriate dashboard
4. ✅ User data saved in MongoDB Atlas
5. ✅ Can now login with created credentials

## API Endpoints Reference:

- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/health` - Health check
- `GET /` - API info

## Password Requirements:
- ✅ Minimum 6 characters
- ✅ Automatically hashed with bcrypt
- ✅ Never stored in plain text

## Need Help?

Check the backend terminal logs for detailed error messages. Each registration attempt is now logged with:
- Received data
- Validation errors (if any)
- Save progress
- Success/failure status
- Detailed error stack traces
