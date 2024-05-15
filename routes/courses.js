const {
  getCourses,
  getCourse,
  getCourseReviews,
  getCourseStats,
  getCourseDetails,
  createCourseReview,
  updateCourseReview,
  deleteCourseReview
} = require("../controllers/courses");
const {authentication} = require("../utils/authentication.js")

const router = require("express").Router();

// /courses
router.get("/", getCourses);
router.get("/:course", getCourse);
router.get("/:course/details", getCourseDetails);
router.get("/:course/stats", getCourseStats);
router.get("/:course/reviews", getCourseReviews);

router.post("/:course/reviews", authentication,createCourseReview);
router.patch("/:course/reviews/:review_id", authentication,updateCourseReview);
router.delete("/:course/reviews/:review_id", authentication,deleteCourseReview);

module.exports = router;
