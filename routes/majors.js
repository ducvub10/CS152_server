const {
  getAllMajors,
  getMajorsRequirements,
} = require("../controllers/majors");
const router = require("express").Router();

router.get("/", getAllMajors);
router.get("/:major/requirements", getMajorsRequirements);

module.exports = router;
