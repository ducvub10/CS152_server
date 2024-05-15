const { getDepartments } = require("../controllers/departments");
const router = require("express").Router();

router.get("/", getDepartments);

module.exports = router;
