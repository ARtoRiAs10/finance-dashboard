// test-api.js
const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function testAPI() {
  try {
    console.log('🔍 Testing API endpoints...');
    console.log('Base URL:', baseURL);
    
    // Test basic API
    const response = await fetch(`${baseURL}/api/accounts`);
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.text();
      console.log('✅ API Response:', data);
    } else {
      console.log('❌ API Error:', response.statusText);
    }
  } catch (error) {
    console.error('❌ Network Error:', error.message);
  }
}

testAPI();
