const connect = require("./connection");

async function getAllSchedules() {
  query = "Select * from `schedules`";
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getPaginatedSchedules(page, limit, course) {
  query = `select s.*, p.name as professor_name from schedules s left join professors p on s.professor_id=p.id where course like '%${course}%' order by class_number limit ${limit} offset ${
    (page - 1) * limit
  }`;

  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getPaginationInfo(limit, course) {
  query = `select ceil(count(*)/${limit}) as pages from schedules where course like '%${course}%'`;

  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return parseInt(rows[0].pages);
}

module.exports = {
  getAllSchedules,
  getPaginatedSchedules,
  getPaginationInfo,
};
