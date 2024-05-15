const connect = require("./connection");

async function getAllCourses() {
  const query = "Select * from `courses`";
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getPaginatedCourses(
  page,
  limit,
  department,
  course_number,
  course_name
) {
  const query = `select department, course_number, name, units from courses where department='${department}' and course_number like '%${course_number}%' and name like '%${course_name}%' limit ${limit} offset ${
    (page - 1) * limit
  }`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getPaginationInfo(
  limit,
  department,
  course_number,
  course_name
) {
  const query = `select ceil(count(*)/${limit}) as pages from courses where department='${department}' and course_number like '%${course_number}%' and name like '%${course_name}%'`;

  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return parseInt(rows[0].pages);
}

async function getCourseDetails(department, course_number) {
  const query = `select * from courses where department='${department}' and course_number='${course_number}'`;

  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows[0];
}

async function getCourseStats(department, course_number) {
  const query = `select get_average_course_grade('${department}', '${course_number}') as avg_grade, get_average_course_quality('${department}', '${course_number}') as avg_quality, get_average_course_difficulty('${department}', '${course_number}') as avg_difficulty, get_course_take_again_percentage('${department}', '${course_number}') as take_again_percent, get_total_course_reviews('${department}', '${course_number}') as total_reviews`;

  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows[0];
}

async function getCourseReviews(department, course_number) {
  const query = `select r.id, r.created_at, r.updated_at, r.content, r.quality, r.difficulty, r.grade, r.take_again, p.name as professor_name, p.email as professor_email, u.name as user_name from reviews r inner join professors p on r.professor_id=p.id inner join users u on r.user_id=u.id where department='${department}' and course_number='${course_number}'`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function insertCourseReview(data, department, course_number, user_id) {
  const conn = await connect();
  const escapedContent = conn.escape(data.content);
  const grade = data.grade ? `'${data.grade}'` : null;
  const query = `INSERT INTO reviews (user_id, professor_id, course_number, department, content, quality, difficulty, grade, take_again) VALUES (${user_id}, ${data.professor_id}, '${course_number}', '${department}', ${escapedContent}, ${data.quality}, ${data.difficulty},  ${grade}, ${data.take_again});`;
  let result = await conn.execute(query);
  conn.end();
  return result;
}

async function patchCourseReview(
  data,
  department,
  course_number,
  review_id,
  user_id
) {
  const query = `UPDATE reviews r SET content = '${data.content}', quality = ${data.quality}, difficulty = ${data.difficulty}, grade = '${data.grade}', take_again = ${data.take_again} WHERE r.id = ${review_id} AND r.course_number = '${course_number}' AND r.department = '${department} AND r.user_id =${user_id}'`;
  const conn = await connect();
  let result = await conn.execute(query);
  conn.end();
  return result;
}

async function deleteCourseReview(
  review_id,
  department,
  course_number,
  user_id
) {
  const query = `DELETE FROM reviews r WHERE ${review_id} = r.id AND r.course_number = '${course_number}' AND r.department = '${department}' AND r.user_id = ${user_id}`;
  const conn = await connect();
  let result = await conn.execute(query);
  conn.end();
  return result;
}

module.exports = {
  getAllCourses,
  getPaginatedCourses,
  getPaginationInfo,
  getCourseDetails,
  getCourseStats,
  getCourseReviews,
  insertCourseReview,
  patchCourseReview,
  deleteCourseReview,
};
