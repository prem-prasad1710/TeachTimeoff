# 🚀 OAuth Setup Guide (Google & GitHub)

## Overview

I've implemented OAuth authentication for Google and GitHub. However, to make it work, you need to create OAuth apps in Google Cloud Console and GitHub.

## Step 1: Setup Google OAuth

### 1.1 Create Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth Client ID"
5. Choose "Web application"
6. Add authorized redirect URI:
   ```
   http://localhost:5000/api/auth/google/callback
   ```
7. Copy the **Client ID** and **Client Secret**

### 1.2 Add to backend/.env

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

---

## Step 2: Setup GitHub OAuth

### 2.1 Create GitHub OAuth App

1. Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in details:
   - **Application name**: TechTimeOff
   - **Homepage URL**: http://localhost:5173
   - **Authorization callback URL**: http://localhost:5000/api/auth/github/callback
4. Click "Register application"
5. Copy the **Client ID**
6. Generate a new **Client Secret** and copy it

### 2.2 Add to backend/.env

```env
# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
```

---

## Step 3: Add Session Secret

Add this to your `backend/.env`:

```env
# Session secret for OAuth
SESSION_SECRET=your_random_session_secret_here_change_in_production
```

---

## Step 4: Frontend URL

Add this to `backend/.env`:

```env
# Frontend URL for redirects
FRONTEND_URL=http://localhost:5173
```

---

## Complete .env Example

```env
# Environment Variables
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/techtimeoff

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# Session
SESSION_SECRET=your_random_session_secret_here_change_in_production

# Frontend
FRONTEND_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

NODE_ENV=development
```

---

## How It Works

### Google Login Flow:
1. User clicks "Continue with Google" button
2. Redirected to: `http://localhost:5000/api/auth/google`
3. Google authentication page opens
4. After success, redirected back to app with user data
5. Auto-login and redirect to dashboard

### GitHub Login Flow:
1. User clicks "Continue with GitHub" button
2. Redirected to: `http://localhost:5000/api/auth/github`
3. GitHub authentication page opens
4. After success, redirected back to app with user data
5. Auto-login and redirect to dashboard

---

## Testing OAuth

### Test Google Login:
```
http://localhost:5000/api/auth/google
```

### Test GitHub Login:
```
http://localhost:5000/api/auth/github
```

---

## Important Notes

1. **In Development**: OAuth redirects to `http://localhost:5173`
2. **In Production**: Update all URLs to your production domain
3. **Security**: Never commit `.env` file to git
4. **User Matching**: If OAuth email matches existing user, accounts are linked

---

## Next Steps

1. Create Google OAuth app and get credentials
2. Create GitHub OAuth app and get credentials
3. Update `backend/.env` with all OAuth credentials
4. Restart backend server
5. Test OAuth buttons on login/signup pages

---

## Need Help?

- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Setup Guide](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
