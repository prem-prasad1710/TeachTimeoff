# 🎯 Complete Database Integration - Step-by-Step Guide

## ✅ What I've Done For You

I've updated your TechTimeOff system to fully integrate with the MongoDB database. Here's everything that's now working:

---

## 📦 **Phase 1: Enhanced API Utilities (COMPLETED)**

### File Updated: `src/utils/api-auth.js`

**New Functions Added:**

1. **`updateUserProfile(userId, profileData)`** - Update user information
2. **`getUserById(userId)`** - Get specific user data
3. **`getAllUsers()`** - Get all users (for coordinators/admin)
4. **`createLeaveRequest(leaveData)`** - Submit new leave request
5. **`getLeaveRequests()`** - Fetch leave history
6. **`getLeaveById(leaveId)`** - Get specific leave details
7. **`approveLeave(leaveId)`** - Approve a leave request
8. **`rejectLeave(leaveId, reason)`** - Reject a leave request
9. **`cancelLeave(leaveId)`** - Cancel own leave request

**What This Means:**
- ✅ All database operations now have dedicated functions
- ✅ Automatic token handling for authentication
- ✅ Error handling built-in
- ✅ localStorage sync for offline support

---

## 👤 **Phase 2: Profile Page Database Integration (COMPLETED)**

### File Updated: `src/pages/Profile.jsx`

**What's New:**

### 1. **Real-Time Data Loading**
```javascript
// When you open Profile page:
1. Shows loading spinner
2. Fetches YOUR data from MongoDB
3. Displays your actual information
4. Loads your profile image from database
```

### 2. **Automatic Saving to Database**
```javascript
// When you edit any field:
1. Type new value → Click ✓
2. Instantly saves to MongoDB
3. Shows success message "Name updated successfully!"
4. Syncs to localStorage as backup
```

### 3. **Profile Image Upload**
```javascript
// When you upload an image:
1. Select image → Auto-resizes (max 800x800)
2. Compresses to reduce size
3. Saves to database immediately
4. Shows success message
5. Image persists across logins
```

### 4. **Features:**
- ✅ **Loading State**: Shows spinner while fetching data
- ✅ **Success Messages**: Green checkmark when saved
- ✅ **Error Handling**: Red warning if save fails
- ✅ **Auto-sync**: Changes save automatically
- ✅ **Offline Support**: localStorage backup

---

## 🔄 **How It Works: The Complete Flow**

### **Scenario 1: You Login**

```
1. Enter credentials → Click Sign In
   ↓
2. Backend validates against MongoDB
   ↓
3. Returns JWT token + user data
   ↓
4. Frontend stores token in localStorage
   ↓
5. Redirects to your role-specific dashboard
   ↓
6. Dashboard shows YOUR real data from database
```

### **Scenario 2: You Update Profile**

```
1. Open Profile page
   ↓
2. Frontend calls fetchCurrentUser()
   ↓
3. Backend queries MongoDB for your user ID
   ↓
4. Returns your latest data
   ↓
5. Profile page displays YOUR information
   ↓
6. You edit "Phone" field → Click ✓
   ↓
7. Frontend calls updateUserProfile(id, {phoneNumber: "999..."})
   ↓
8. Backend updates MongoDB
   ↓
9. Success! Green message appears
   ↓
10. Next login shows updated phone number
```

### **Scenario 3: You Upload Profile Image**

```
1. Click "Change Photo"
   ↓
2. Select image file
   ↓
3. Frontend resizes & compresses
   ↓
4. Converts to base64 string
   ↓
5. Calls updateUserProfile(id, {profileImage: "data:image..."})
   ↓
6. Backend saves to MongoDB
   ↓
7. Image appears immediately
   ↓
8. Shows on Dashboard too (synced!)
```

---

## 🧪 **How to Test Everything**

### **Test 1: Profile Data Persistence**

1. **Login** as Faculty (faculty@jims.edu / faculty123)
2. **Open** Profile page
3. **Wait** for loading to finish
4. **Verify** you see:
   - Name: "Faculty User"
   - Email: "faculty@jims.edu"
   - Department: "Computer Applications"
   - Employee ID: "FAC001"

### **Test 2: Update Your Name**

1. On Profile page, click **Edit** (pencil icon) next to "Name"
2. Change to: "Dr. Faculty User"
3. Click **✓** (checkmark)
4. **Watch for**:
   - ✅ Green message: "Name updated successfully!"
   - Name updates immediately
5. **Logout** and **Login again**
6. **Check**: Name is still "Dr. Faculty User" ✅

### **Test 3: Upload Profile Image**

1. On Profile page, click **"Change Photo"**
2. Select an image file (JPG/PNG)
3. **Watch for**:
   - Image appears immediately
   - ✅ Green message: "Profile image updated successfully!"
4. **Open** Dashboard page
5. **Verify**: Same image shows in Dashboard profile card
6. **Logout** and **Login**
7. **Check**: Image persists ✅

### **Test 4: Update Phone Number**

1. Edit phone field → Enter: "+91 9876543210"
2. Click ✓
3. **Verify**: Green success message
4. **Open** MongoDB Compass or CLI:
```bash
mongosh techtimeoff
db.users.findOne({email: "faculty@jims.edu"}, {phoneNumber: 1})
```
5. **Check**: Phone number updated in database ✅

---

## 📊 **What's Stored in MongoDB**

### **User Document Example:**
```javascript
{
  _id: ObjectId("690ca0ea311b1a960bdd9be7"),
  name: "Dr. Faculty User",              // ← Updates when you edit
  email: "faculty@jims.edu",
  password: "$2a$10$4Ycr56BcQB...",      // ← Hashed securely
  role: "faculty",
  department: "Computer Applications",
  employeeId: "FAC001",
  phoneNumber: "+91 9876543210",         // ← Updates when you edit
  profileImage: "data:image/jpeg;base64,/9j/4AAQ...",  // ← Your photo
  leaveBalance: {
    casualLeave: 10,
    earnedLeave: 15,
    marriageLeave: 5,
    sickLeave: 6,
    maternityLeave: 0,
    paternityLeave: 0
  },
  isActive: true,
  createdAt: ISODate("2025-11-06T..."),
  updatedAt: ISODate("2025-11-06T...")   // ← Updates on each save
}
```

---

## 🔮 **What Happens Automatically**

### **When You Edit Profile:**
1. ✅ Saves to MongoDB
2. ✅ Updates localStorage (backup)
3. ✅ Shows success message
4. ✅ Updates `updatedAt` timestamp
5. ✅ Syncs across all pages

### **When You Upload Image:**
1. ✅ Resizes to max 800x800px
2. ✅ Compresses to 80% quality
3. ✅ Converts to base64
4. ✅ Saves to MongoDB
5. ✅ Shows on Dashboard immediately

### **When You Login:**
1. ✅ Fetches latest data from MongoDB
2. ✅ Loads your profile image
3. ✅ Displays on Dashboard
4. ✅ Stores in localStorage cache

---

## 🚀 **Next Steps: What You Can Do**

### **Immediate Actions:**

1. **Test the Profile Page**
   ```bash
   npm run dev  # Start frontend
   # Login → Profile → Edit fields → Verify saves
   ```

2. **Upload a Profile Image**
   - Use a professional photo
   - See it sync to Dashboard

3. **Verify Database Updates**
   ```bash
   mongosh techtimeoff
   db.users.findOne({email: "faculty@jims.edu"})
   ```

---

## 📝 **What's Still Hardcoded (Phase 3 Coming)**

### **Currently Using Dummy Data:**

1. **Dashboard Leave History**
   - Still shows hardcoded leave requests
   - **Solution**: I'll update to fetch from `/api/leaves`

2. **Leave Request Form**
   - No form to submit new requests yet
   - **Solution**: I'll create LeaveRequest.jsx with form

3. **Coordinator Approvals**
   - Approve/Reject buttons not functional
   - **Solution**: I'll connect to API endpoints

4. **Leave Balance**
   - Shows static numbers
   - **Solution**: Calculate from approved leaves

---

## 🔧 **Troubleshooting**

### **Issue: "Failed to load user data"**
**Solution:**
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Restart backend if needed
cd backend
npm run dev
```

### **Issue: "Failed to save profile image"**
**Possible Causes:**
1. Image too large (>16MB MongoDB limit)
2. Backend not running
3. Token expired

**Solution:**
```javascript
// Image is auto-resized to prevent this
// But if it fails, try smaller image
```

### **Issue: Changes don't persist after logout**
**Check:**
1. Did you see green success message?
2. Is backend running?
3. Check browser console for errors

**Debug:**
```bash
# Check database directly
mongosh techtimeoff
db.users.findOne({email: "YOUR_EMAIL"})
```

---

## 🎯 **What to Test Right Now**

### **Checklist:**

- [ ] Login works
- [ ] Profile page loads YOUR data
- [ ] Edit name → Saves to database
- [ ] Edit phone → Saves to database
- [ ] Upload image → Saves to database
- [ ] Image shows on Dashboard
- [ ] Logout → Login → Data persists
- [ ] Success messages appear
- [ ] Error handling works (try with backend off)

---

## 📚 **Key Files Modified**

1. ✅ `src/utils/api-auth.js` - All API functions
2. ✅ `src/pages/Profile.jsx` - Database integration
3. 🔄 `src/pages/Dashboard.jsx` - Next: Fetch real leave data
4. 🔄 `src/pages/LeaveRequest.jsx` - Next: Create form
5. 🔄 `src/pages/CoordinatorDashboard.jsx` - Next: Connect approvals

---

## 🎊 **Success Indicators**

You'll know it's working when:

✅ Profile loads without errors
✅ Green messages appear when you edit
✅ Image uploads successfully
✅ Data persists after logout → login
✅ MongoDB shows updated values
✅ No red errors in console

---

## 🚀 **Ready for Phase 3?**

Let me know when you want to:
1. **Create Leave Request Form** - Submit new leave applications
2. **Fetch Real Leave History** - Replace hardcoded data
3. **Enable Approvals** - Make coordinator buttons functional
4. **Add Notifications** - Email alerts on approval/rejection

**Just say: "Continue with Phase 3"** and I'll implement the next features!

---

**Your system is now 50% database-integrated! 🎉**

Test the Profile page and let me know what you want to add next!
