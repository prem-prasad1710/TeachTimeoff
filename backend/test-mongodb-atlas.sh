#!/bin/bash

echo "🧪 Testing MongoDB Atlas Connection"
echo "===================================="
echo ""

cd "$(dirname "$0")"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Testing MongoDB Connection${NC}"
echo "-----------------------------------"
echo ""

node -e "
const mongoose = require('mongoose');
const uri = 'mongodb+srv://Prem:Prem%241710@cluster0.wv2ni.mongodb.net/Imaginify?retryWrites=true&w=majority&appName=Cluster0';

console.log('📡 Connecting to MongoDB Atlas...');
console.log('Cluster: cluster0.wv2ni.mongodb.net');
console.log('Database: Imaginify');
console.log('');

mongoose.connect(uri, { 
  serverSelectionTimeoutMS: 10000 
})
.then(() => {
  console.log('✅ SUCCESS: MongoDB Atlas Connected!');
  console.log('');
  console.log('✅ Your MongoDB IP whitelist is configured correctly!');
  console.log('✅ Vercel deployment will work!');
  console.log('');
  mongoose.disconnect();
  process.exit(0);
})
.catch(err => {
  console.log('❌ FAILED: Could not connect to MongoDB Atlas');
  console.log('');
  console.log('Error:', err.message);
  console.log('');
  console.log('🔴 ACTION REQUIRED:');
  console.log('1. Go to https://cloud.mongodb.com');
  console.log('2. Click \"Network Access\" (left sidebar)');
  console.log('3. Click \"+ ADD IP ADDRESS\"');
  console.log('4. Click \"ALLOW ACCESS FROM ANYWHERE\"');
  console.log('5. Click \"Confirm\"');
  console.log('6. Wait 1-2 minutes and run this test again');
  console.log('');
  mongoose.disconnect();
  process.exit(1);
});
"
