const connect = require("./connection");

async function getAllProfessors() {
  query = "Select * from `professors`";
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getPaginatedProfessors(page, limit, name, projection) {
  query = `select ${projection} from professors where name like '%${name}%' limit ${limit} offset ${
    (page - 1) * limit
  }`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getPaginationInfo(limit, name) {
  query = `select ceil(count(*)/${limit}) as pages from professors where name like '%${name}%'`;

  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return parseInt(rows[0].pages);
}

async function getProfessorDetails(professor_id) {
  const query = `select * from professors where id=${professor_id}`;

  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows[0];
}

async function getProfessorStats(professor_id) {
  const query = `select get_average_professor_grade(${professor_id}) as avg_grade, get_average_professor_quality(${professor_id}) as avg_quality, get_average_professor_difficulty(${professor_id}) as avg_difficulty, get_professor_take_again_percentage(${professor_id}) as take_again_percent, get_total_professor_reviews(${professor_id}) as total_reviews`;

  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows[0];
}

async function getProfessorReviews(professor_id) {
  const query = `select r.id, r.created_at, r.updated_at, r.content, r.quality, r.difficulty, r.grade, r.take_again, c.department, c.course_number, c.name as course_name, u.name as user_name from reviews r inner join courses c on r.department=c.department and r.course_number=c.course_number inner join users u on r.user_id=u.id where r.professor_id=${professor_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function insertProfessorReview(data, professor_id, user_id) {
  const conn = await connect();
  const escapedContent = conn.escape(data.content);
  const grade = data.grade ? `'${data.grade}'` : null;
  const query = `INSERT INTO reviews (user_id, professor_id, course_number, department, content, quality, difficulty, grade, take_again) VALUES (${user_id}, ${professor_id}, '${data.course_number}', '${data.department}', ${escapedContent}, ${data.quality}, ${data.difficulty}, ${grade}, ${data.take_again});`;
  let result = await conn.execute(query);
  conn.end();
  return result;
}

module.exports = {
  getAllProfessors,
  getPaginatedProfessors,
  getPaginationInfo,
  getProfessorDetails,
  getProfessorStats,
  getProfessorReviews,
  insertProfessorReview,
};
