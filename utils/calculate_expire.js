function calculateExpiresAt(expiresIn) {
    const expiresInMilliseconds = expiresIn * 1000;
    const expiresAt = new Date().getTime() + expiresInMilliseconds;
    return expiresAt;
  }

module.exports = { calculateExpiresAt };