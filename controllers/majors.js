const {
  queryAllMajors,
  queryMajorRequirements,
} = require("../services/majors");

async function getAllMajors(req, res) {
  try {
    const data = await queryAllMajors();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getMajorsRequirements(req, res) {
  try {
    const major_name = req.params.major;
    const data = await queryMajorRequirements(major_name);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { getAllMajors, getMajorsRequirements };
