#!/bin/bash

echo "🚀 TechTimeOff - Complete Deployment Setup"
echo "==========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: MongoDB Atlas IP Whitelist
echo -e "${YELLOW}Step 1: MongoDB Atlas IP Whitelist${NC}"
echo "======================================"
echo ""
echo "⚠️  IMPORTANT: You MUST allow connections from anywhere!"
echo ""
echo "1. Go to: https://cloud.mongodb.com"
echo "2. Login with your account"
echo "3. Click 'Network Access' (left sidebar)"
echo "4. Click 'Add IP Address'"
echo "5. Click 'Allow Access from Anywhere' (0.0.0.0/0)"
echo "6. Click 'Confirm'"
echo ""
read -p "Press Enter after completing MongoDB setup..."

# Step 2: Test MongoDB Connection
echo ""
echo -e "${YELLOW}Step 2: Testing MongoDB Connection${NC}"
echo "===================================="
echo ""

cd "$(dirname "$0")"

MONGO_TEST=$(node -e "
const mongoose = require('mongoose');
const uri = 'mongodb+srv://Prem:Prem%241710@cluster0.wv2ni.mongodb.net/Imaginify?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => { console.log('SUCCESS'); process.exit(0); })
  .catch(err => { console.log('FAILED'); process.exit(1); });
" 2>&1)

if echo "$MONGO_TEST" | grep -q "SUCCESS"; then
    echo -e "${GREEN}✅ MongoDB Connection: SUCCESS${NC}"
else
    echo -e "${RED}❌ MongoDB Connection: FAILED${NC}"
    echo ""
    echo "Please fix MongoDB Atlas IP whitelist and try again!"
    exit 1
fi

# Step 3: Install Vercel CLI
echo ""
echo -e "${YELLOW}Step 3: Vercel CLI Setup${NC}"
echo "========================"
echo ""

if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
else
    echo -e "${GREEN}✅ Vercel CLI already installed${NC}"
fi

# Step 4: Deploy Backend
echo ""
echo -e "${YELLOW}Step 4: Deploy Backend to Vercel${NC}"
echo "=================================="
echo ""
echo "Run this command to deploy backend:"
echo ""
echo -e "${GREEN}cd /Users/premprasad/Desktop/kittu/TechTimeoff/backend && vercel --prod${NC}"
echo ""
echo "When prompted:"
echo "  - Set up and deploy? → Y"
echo "  - Which scope? → Your account"
echo "  - Link to existing project? → N"
echo "  - Project name? → techtimeoff-backend"
echo "  - Directory? → Press Enter"
echo "  - Override settings? → N"
echo ""
echo "After deployment, you'll get a URL like:"
echo "  https://techtimeoff-backend.vercel.app"
echo ""
read -p "Press Enter after backend deployment..."

# Step 5: Environment Variables
echo ""
echo -e "${YELLOW}Step 5: Set Environment Variables${NC}"
echo "==================================="
echo ""
echo "Go to: https://vercel.com/dashboard"
echo ""
echo "1. Select 'techtimeoff-backend' project"
echo "2. Settings → Environment Variables"
echo "3. Add these variables:"
echo ""
echo "MONGODB_URI = mongodb+srv://Prem:Prem%241710@cluster0.wv2ni.mongodb.net/Imaginify?retryWrites=true&w=majority&appName=Cluster0"
echo "JWT_SECRET = your_super_secret_jwt_key_change_this_in_production_12345"
echo "SESSION_SECRET = your_random_session_secret_here_change_in_production"
echo "FRONTEND_URL = https://teachtimeoff.vercel.app"
echo "GOOGLE_CLIENT_ID = 499749039149-hkoi5nij8b5nlleta6qi7n7c6d2an69e.apps.googleusercontent.com"
echo "GOOGLE_CLIENT_SECRET = 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"
echo "GOOGLE_CALLBACK_URL = https://teachtimeoff-backend.vercel.app/api/auth/google/callback"
echo "GITHUB_CLIENT_ID = Ov23lipWCSU1Noslpi2z"
echo "GITHUB_CLIENT_SECRET = 038912411db22817c2b48de7ed5a62f1812428ff"
echo "GITHUB_CALLBACK_URL = https://teachtimeoff-backend.vercel.app/api/auth/github/callback"
echo "NODE_ENV = production"
echo ""
read -p "Press Enter after adding environment variables..."

# Step 6: Update Frontend
echo ""
echo -e "${YELLOW}Step 6: Update Frontend Environment Variable${NC}"
echo "=============================================="
echo ""
echo "1. Go to Vercel dashboard"
echo "2. Select 'teachtimeoff' (frontend) project"
echo "3. Settings → Environment Variables"
echo "4. Add: VITE_API_URL = https://teachtimeoff-backend.vercel.app/api"
echo "5. Redeploy frontend"
echo ""
read -p "Press Enter after updating frontend..."

# Step 7: OAuth Callback URLs
echo ""
echo -e "${YELLOW}Step 7: Update OAuth Callback URLs${NC}"
echo "===================================="
echo ""
echo "Google Cloud Console:"
echo "  1. Go to: https://console.cloud.google.com"
echo "  2. APIs & Services → Credentials"
echo "  3. Edit OAuth 2.0 Client"
echo "  4. Add redirect URI: https://teachtimeoff-backend.vercel.app/api/auth/google/callback"
echo "  5. Save"
echo ""
echo "GitHub OAuth App:"
echo "  1. Go to: https://github.com/settings/developers"
echo "  2. Click your OAuth App"
echo "  3. Update callback URL: https://teachtimeoff-backend.vercel.app/api/auth/github/callback"
echo "  4. Update application"
echo ""
read -p "Press Enter after updating OAuth URLs..."

# Done!
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Deployment Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Test your app at:"
echo -e "${GREEN}https://teachtimeoff.vercel.app${NC}"
echo ""
echo "Test credentials:"
echo "  Email: faculty@jims.edu"
echo "  Password: faculty123"
echo ""
echo "Or test OAuth:"
echo "  - Click 'Continue with GitHub'"
echo "  - Click 'Continue with Google'"
echo ""
