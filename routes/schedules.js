const { getSchedules } = require("../controllers/schedules");
const router = require("express").Router();

router.get("/", getSchedules);

module.exports = router;
