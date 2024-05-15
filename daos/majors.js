const connect = require("./connection");

async function getAllMajors() {
  query = "Select * from `majors`";
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getMajorRequirements(major_name) {
  query = `select mr.department, mr.course_number, c.name from major_requirements mr inner join courses c on mr.department=c.department and mr.course_number=c.course_number where major='${major_name}'`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

module.exports = {
  getAllMajors,
  getMajorRequirements,
};
