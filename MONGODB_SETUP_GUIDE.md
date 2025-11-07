# 🎯 MongoDB Setup - Local & Atlas

## ✅ Current Status: Using Local MongoDB

Your app is now using **local MongoDB** with database name **"Imaginify"**.

### Database Details:
- **Database Name**: `Imaginify`
- **Connection**: `mongodb://localhost:27017/Imaginify`
- **Status**: ✅ Connected
- **Users**: 4 seeded accounts ready to use

### Test Accounts:
```
faculty@jims.edu / faculty123
coordinator@jims.edu / coord123
chief@jims.edu / chief123
principal@jims.edu / principal123
```

---

## 🔧 How to Switch to MongoDB Atlas (Cloud)

### Why Atlas Connection Failed:

The error `ECONNRESET` means:
1. **Network Issue**: Your IP might be blocked by firewall/VPN
2. **IP Not Whitelisted**: MongoDB Atlas is rejecting your connection
3. **Cluster Paused**: Your Atlas cluster might be paused/inactive

### Step-by-Step Fix:

#### 1. Check MongoDB Atlas Cluster Status
1. Go to: https://cloud.mongodb.com/
2. Login with your credentials
3. Check if cluster shows **"Active"** (not paused)
4. If paused, click "Resume" button

#### 2. Whitelist Your IP Address

**Option A: Add Current IP (Recommended)**
1. In Atlas Dashboard, click **"Network Access"** (left sidebar)
2. Click **"+ ADD IP ADDRESS"** button
3. Click **"Add Current IP Address"**
4. Click **"Confirm"**
5. Wait 1-2 minutes for changes to apply

**Option B: Allow All IPs (Development Only - NOT SECURE for production!)**
1. In Atlas Dashboard, click **"Network Access"**
2. Click **"+ ADD IP ADDRESS"**
3. In "Access List Entry", enter: `0.0.0.0/0`
4. Add comment: "Development - Allow All"
5. Click **"Add Entry"**
6. Wait 1-2 minutes

#### 3. Verify Database User Credentials
1. In Atlas, click **"Database Access"** (left sidebar)
2. Find user **"Prem"**
3. Make sure password is: `Prem$1710`
4. If unsure, click "Edit" → "Edit Password" → Set new password

#### 4. Test Connection
After whitelisting IP, test the connection:

```bash
# Test with MongoDB shell
mongosh "mongodb+srv://Prem:Prem%241710@cluster0.wv2ni.mongodb.net/Imaginify?retryWrites=true&w=majority"
```

If it connects successfully, then update your `.env`:

#### 5. Switch to Atlas in .env

Edit `backend/.env`:

```env
# MongoDB Atlas (ACTIVE - Imaginify Database)
MONGODB_URI=mongodb+srv://Prem:Prem%241710@cluster0.wv2ni.mongodb.net/Imaginify?retryWrites=true&w=majority&appName=Cluster0

# Local MongoDB (backup)
# MONGODB_URI=mongodb://localhost:27017/Imaginify
```

#### 6. Restart Backend
```bash
# Stop backend (Ctrl+C)
# Restart
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
```

#### 7. Seed Atlas Database
```bash
node seed.js
```

---

## 🆚 Local vs Atlas Comparison

| Feature | Local MongoDB | MongoDB Atlas |
|---------|---------------|---------------|
| **Speed** | ⚡ Faster (localhost) | 🌐 Slower (internet) |
| **Reliability** | ✅ Always works offline | ❌ Needs internet |
| **Setup** | ✅ Already working | ⚠️ Needs IP whitelist |
| **Access** | 🖥️ Only this computer | ☁️ Access from anywhere |
| **Backup** | ⚠️ Manual backups needed | ✅ Auto-backups |
| **Production** | ❌ Not recommended | ✅ Production-ready |

---

## 🎯 Recommendation

### For Development (Right Now):
✅ **Use Local MongoDB** (already configured and working)
- Faster development
- No internet issues
- No IP whitelist hassles

### For Production (Later):
✅ **Use MongoDB Atlas**
- Cloud-hosted
- Better scalability
- Automatic backups
- Access from anywhere

---

## 🚀 Current Setup (What's Working)

✅ **Backend**: Running on `http://localhost:5000`
✅ **Database**: Local MongoDB `Imaginify`
✅ **Users**: 4 test accounts created
✅ **Login**: Working with password reset script
✅ **Signup**: Working and saving to database
✅ **OAuth**: Implemented (needs credentials)

---

## 📝 Next Steps

1. **Test Login**: http://localhost:5173/login
   - Use: `faculty@jims.edu` / `faculty123`

2. **Test Signup**: http://localhost:5173/signup
   - Create a new account
   - Data saves to local `Imaginify` database

3. **Fix Atlas Later**: Follow the guide above when you want cloud access

4. **OAuth Setup**: Follow `OAUTH_SETUP_GUIDE.md` for Google/GitHub login

---

## 🔍 Troubleshooting

### If Atlas still fails after whitelisting:

1. **Check VPN/Firewall**: Disable VPN, check firewall settings
2. **Try Different Network**: Use mobile hotspot to test
3. **Check Cluster Region**: Ensure cluster region is accessible from your location
4. **Contact Support**: MongoDB Atlas support can check if there's an issue

### If Local MongoDB stops working:

```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community

# Restart MongoDB
brew services restart mongodb-community
```

---

## ✅ Summary

- **Current**: Local MongoDB with "Imaginify" database ✅
- **Data**: All user data saves to local Imaginify database ✅
- **Working**: Login, Signup, Profile, all features ✅
- **Atlas**: Available when you fix IP whitelist (optional for now)

**Everything is working perfectly with local MongoDB! You can develop your app without any issues.** 🎉
