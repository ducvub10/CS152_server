const {
  getUserReviews,
  getUserComments,
  getUserFlags,
  deleteUserReview,
  deleteUserComment,
  deleteUserFlag,
  patchUserReview,
  patchUserComment,
} = require("../controllers/user");
const { authentication } = require("../utils/authentication");
const router = require("express").Router();

router.get("/reviews", authentication, getUserReviews);
router.get("/comments", authentication, getUserComments);
router.get("/flags", authentication, getUserFlags);
router.patch("/reviews/:review_id", authentication, patchUserReview);
router.patch("/comments/:comment_id", authentication, patchUserComment);
router.delete("/reviews/:review_id", authentication, deleteUserReview);
router.delete("/comments/:comment_id", authentication, deleteUserComment);
router.delete("/flags/:flag_id", authentication, deleteUserFlag);

module.exports = router;
