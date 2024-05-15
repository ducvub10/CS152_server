const axios = require('axios');
const qs = require('querystring');

async function refreshAccessToken(refreshToken) {
  const requestBody = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify(requestBody), config);
    console.log("Successfully refreshed access token.")
    return {
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in
    }
  } catch (error) {
    console.error('Failed to refresh access token: ', error);
  }
}

module.exports={refreshAccessToken}