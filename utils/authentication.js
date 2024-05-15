async function authentication(req, res, next) {
  if (req.isAuthenticated()) {
    // The user is authenticated
    // res.status(200).json({isAuthenticated:true,user_id:req.user.id})
    return next();
  }

  return res.status(401).json({ isAuthenticated: false, user_id: null });
}

module.exports = {
  authentication,
};
