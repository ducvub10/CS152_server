const {
  getProfessors,
  getProfessor,
  getProfessorDetails,
  getProfessorStats,
  getProfessorReviews,
  createProfessorReview,
} = require("../controllers/professors");
const { authentication } = require("../utils/authentication.js");
const router = require("express").Router();

router.get("/", getProfessors);
router.get("/:professor_id", getProfessor);
router.get("/:professor_id/details", getProfessorDetails);
router.get("/:professor_id/stats", getProfessorStats);
router.get("/:professor_id/reviews", getProfessorReviews);

router.post("/:professor_id/reviews", authentication, createProfessorReview);

module.exports = router;
