const { getAllMajors, getMajorRequirements } = require("../daos/majors");

async function queryAllMajors() {
  return await getAllMajors();
}

async function queryMajorRequirements(major_name) {
  return await getMajorRequirements(major_name);
}

module.exports = { queryAllMajors, queryMajorRequirements };
