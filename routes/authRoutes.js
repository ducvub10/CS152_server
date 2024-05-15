// routes/authRoutes.js

const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'],
accessType: 'offline', approvalPrompt: 'force' })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${
      process.env.PROD_CLIENT_URL || process.env.DEV_CLIENT_URL
    }/profile`,
  })
);

router.get("/auth/google/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, user: null });
  }
});

router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    console.log("logged out");
  });
  res.status(200).json({ success: true });
});

module.exports = router;
