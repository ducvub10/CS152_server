const { querySchedules } = require("../services/schedules");

async function getSchedules(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const course = req.query.search || "";
    const data = await querySchedules(page, limit, course);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getSchedules,
};
