const connect = require("./connection");

async function getAllDepartments(projection) {
  query = `Select ${projection} from departments`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

module.exports = {
  getAllDepartments,
};
