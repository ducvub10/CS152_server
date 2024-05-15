function isTokenExpired(user) {
    // Check if the token or its expiration time is stored in the user object
    token = user.accessToken;
    expiresAt = user.expiresAt;

    
    if (!token || !expiresAt) {
      return false;
    }
  
    // Get the current time
    const currentTime = new Date().getTime();
  
    // Check if the current time is past the token's expiration time
    return currentTime > expiresAt;
  }

  module.exports = { isTokenExpired };