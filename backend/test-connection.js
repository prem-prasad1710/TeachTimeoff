const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// Test MongoDB connections
async function testConnections() {
  console.log('🧪 Testing MongoDB Connections...\n')

  // Test 1: Local MongoDB
  console.log('📍 Test 1: Local MongoDB')
  console.log('URI:', 'mongodb://localhost:27017/Imaginify')
  try {
    await mongoose.connect('mongodb://localhost:27017/Imaginify', {
      serverSelectionTimeoutMS: 5000
    })
    console.log('✅ Local MongoDB: CONNECTED\n')
    await mongoose.disconnect()
  } catch (error) {
    console.log('❌ Local MongoDB: FAILED')
    console.log('Error:', error.message, '\n')
  }

  // Test 2: MongoDB Atlas
  console.log('📍 Test 2: MongoDB Atlas')
  const atlasUri = 'mongodb+srv://Prem:Prem%241710@cluster0.wv2ni.mongodb.net/Imaginify?retryWrites=true&w=majority&appName=Cluster0'
  console.log('URI:', atlasUri.replace(/Prem%241710/, '****'))
  try {
    await mongoose.connect(atlasUri, {
      serverSelectionTimeoutMS: 10000
    })
    console.log('✅ MongoDB Atlas: CONNECTED\n')
    
    // Test write operation
    const testCollection = mongoose.connection.db.collection('test')
    await testCollection.insertOne({ test: true, timestamp: new Date() })
    console.log('✅ Write Test: SUCCESS')
    
    // Cleanup
    await testCollection.deleteOne({ test: true })
    await mongoose.disconnect()
    
    console.log('\n🎉 MongoDB Atlas is working perfectly!')
    console.log('📝 Update your backend/.env to use Atlas:\n')
    console.log('MONGODB_URI=' + atlasUri)
    
  } catch (error) {
    console.log('❌ MongoDB Atlas: FAILED')
    console.log('Error:', error.message)
    
    if (error.message.includes('IP')) {
      console.log('\n💡 Solution: Whitelist your IP in MongoDB Atlas')
      console.log('   1. Go to: https://cloud.mongodb.com/')
      console.log('   2. Click: Network Access → Add IP Address')
      console.log('   3. Choose: Allow Access from Anywhere (0.0.0.0/0)')
      console.log('   4. Wait: 2-3 minutes for changes to apply')
      console.log('   5. Run this script again')
    } else if (error.message.includes('auth')) {
      console.log('\n💡 Solution: Check your password')
      console.log('   Password "Prem$1710" should be encoded as "Prem%241710"')
    } else {
      console.log('\n💡 Solution: Check internet connection or cluster status')
    }
    
    console.log('\n📌 For now, use local MongoDB (works perfectly!):\n')
    console.log('MONGODB_URI=mongodb://localhost:27017/Imaginify')
  }
}

// Run tests
testConnections().then(() => {
  console.log('\n✅ Connection test complete!')
  process.exit(0)
}).catch(err => {
  console.error('\n❌ Test failed:', err)
  process.exit(1)
})
