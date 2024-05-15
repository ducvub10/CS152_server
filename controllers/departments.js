const { queryDepartments } = require("../services/departments");

async function getDepartments(req, res) {
  try {
    const projection = req.query.projection || "*";
    const rows = await queryDepartments(projection);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getDepartments,
};
