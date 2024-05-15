const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    // The user is authenticated
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    // The user is not authenticated
    res.status(200).json({ authenticated: false, user: null });
  }
});

module.exports = router;
