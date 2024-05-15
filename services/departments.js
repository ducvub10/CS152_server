const { getAllDepartments } = require("../daos/departments");

async function queryDepartments(projection) {
  return await getAllDepartments(projection);
}

module.exports = { queryDepartments };
