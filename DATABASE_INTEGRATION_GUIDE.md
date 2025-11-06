# 🗄️ Complete Guide: Database Integration for User Data

## Overview
This guide will help you integrate your frontend with the backend database to:
1. Store user profile data (name, email, department, phone, profile image)
2. Retrieve actual user data on login
3. Update user profile information
4. Upload and store profile images
5. Sync data across all pages

---

## 🎯 Step-by-Step Implementation Plan

### **Phase 1: Update App.jsx to Fetch Real User Data**
Currently, your app uses localStorage for user data. We'll update it to fetch from the API.

### **Phase 2: Update Profile Page to Save to Database**
Enable the profile page to update user information in MongoDB.

### **Phase 3: Implement Profile Image Upload**
Add functionality to upload and store profile images.

### **Phase 4: Sync Data Across All Pages**
Ensure all dashboards show real-time user data from the database.

### **Phase 5: Implement Leave Request Storage**
Store leave requests in the database instead of hardcoded data.

---

## 🚀 Phase 1: Fetch Real User Data on App Load

### **Step 1.1: Update App.jsx**

**What to do:**
- When the app loads, fetch current user from API
- Store user data in React state
- Pass real data to all components

**Files to modify:**
- `src/App.jsx`

**Changes:**
```javascript
// Add useEffect to fetch user on mount
useEffect(() => {
  const fetchUser = async () => {
    if (isAuthenticated()) {
      try {
        const userData = await fetchCurrentUser()
        if (userData) {
          // User data is now from database
          console.log('Loaded user from DB:', userData)
        }
      } catch (error) {
        // Token expired or invalid, redirect to login
        logout()
        navigate('/login')
      }
    }
  }
  
  fetchUser()
}, [])
```

---

## 🔧 Phase 2: Update Profile Page to Save to Database

### **Step 2.1: Create Profile Update API Call**

**What to do:**
- Create function to update user profile via API
- Handle profile image uploads
- Show success/error messages

**Files to modify:**
- `src/utils/api-auth.js` (add updateProfile function)
- `src/pages/Profile.jsx`

**New API function:**
```javascript
export const updateUserProfile = async (userId, profileData) => {
  return await apiRequest(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(profileData)
  })
}
```

---

## 📸 Phase 3: Profile Image Upload

### **Step 3.1: Add Image Upload to Backend**

**What to do:**
- Create endpoint to handle base64 image uploads
- Validate image size and format
- Store in database

**Step 3.2: Update Frontend Profile Page**

**What to do:**
- Add image upload button
- Convert image to base64
- Send to API
- Update UI with new image

---

## 🔄 Phase 4: Sync Data Across Pages

### **Step 4.1: Create Global User Context**

**What to do:**
- Create React Context for user data
- Provide user data to all components
- Auto-refresh when data changes

**Files to create:**
- `src/contexts/UserContext.jsx`

---

## 📝 Phase 5: Store Leave Requests in Database

### **Step 5.1: Create Leave Request Form**

**What to do:**
- Create form to submit leave requests
- Send to backend API
- Store in MongoDB

### **Step 5.2: Fetch Leave History from Database**

**What to do:**
- Replace hardcoded leave history
- Fetch from `/api/leaves` endpoint
- Display real data in dashboard

---

## 🛠️ Implementation Order (Recommended)

### **Quick Start (Do This First):**
1. ✅ Update `api-auth.js` with user profile functions
2. ✅ Update `Profile.jsx` to save to database
3. ✅ Test profile updates work

### **Next Steps:**
4. Add profile image upload
5. Create leave request form
6. Fetch leave history from API
7. Add user context for global state

### **Polish:**
8. Add loading states
9. Add error handling
10. Add success notifications

---

## 📚 Detailed Implementation (Next Messages)

I'll now create the actual code for each phase. Let's start!

Would you like me to:
1. **Start with Phase 1** - Update App.jsx to fetch real user data?
2. **Start with Phase 2** - Enable Profile page to update database?
3. **Do everything at once** - I'll implement all phases?

**Recommended:** Let me do everything at once, so you have a complete working system!
