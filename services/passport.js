// services/passport.js
require("dotenv").config();
const { findOrCreate } = require("../daos/user");
// const User = require("../daos/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { isTokenExpired } = require("../utils/check_expired");
const { refreshAccessToken } = require("../utils/refresh_token");
const { calculateExpiresAt } = require("../utils/calculate_expire");
const { param } = require("../routes/user");

passport.serializeUser((user, done) => {
  if (user && user.google_id) {
    done(null, {
      google_id: user.google_id,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      expiresAt: user.expiresAt,
    });
  } else {
    done(new Error("User object is missing google_id property"));
  }
});
passport.deserializeUser(async (sessionUser, done) => {
  // Check if the access token has expired
  if (isTokenExpired(sessionUser)) {
    try {
      // Refresh the access token
      const { accessToken: newAccessToken, expiresIn } =
        await refreshAccessToken(sessionUser.refreshToken);

      // Update the user's session with the new access token
      sessionUser.accessToken = newAccessToken;

      const expiresAt = calculateExpiresAt(expiresIn);

      sessionUser.expiresAt = expiresAt;
    } catch (error) {
      return done(error);
    }
  }

  const user = await findOrCreate(sessionUser.google_id);
  user.accessToken = sessionUser.accessToken;
  user.refreshToken = sessionUser.refreshToken;
  user.expiresAt = sessionUser.expiresAt;

  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${
        process.env.PROD_SERVER_URL || process.env.DEV_SERVER_URL
      }/auth/google/callback`,
      accessType: "offline",
      prompt: "force",
    },
    async (accessToken, refreshToken, params, profile, done) => {
      try {
        const user = await findOrCreate(
          profile.id,
          profile.displayName,
          profile.emails[0].value,
          profile.photos[0].value
        );

        const expiresIn = params.expires_in;
        const expiresAt = calculateExpiresAt(expiresIn);

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        user.expiresAt = expiresAt;

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
