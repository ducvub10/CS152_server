const connect = require("./connection.js");

async function findOrCreate(google_id, name, email, photo) {
  const client = await connect();
  let result = await client.query("SELECT * FROM users WHERE google_id = ?", [
    google_id,
  ]);
  if (result[0].length === 0) {
    await client.query(
      "INSERT INTO users (google_id, name, email, photo) VALUES (?, ?, ?, ?)",
      [google_id, name, email, photo]
    );
    result = await client.query("SELECT * FROM users WHERE google_id = ?", [
      google_id,
    ]);
  }
  await client.end();
  return result[0].length > 0 ? result[0][0] : undefined; // return the user object or undefined if no user was found
}

async function getUserReviews(user_id) {
  const query = `select r.id, r.created_at as review_created_at, r.updated_at as review_updated_at, r.department, r.course_number, r.content as review_content, r.quality, r.difficulty, r.grade, r.take_again, p.name as professor_name from reviews r inner join professors p on r.professor_id=p.id where r.user_id=${user_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function updateUserReview(review_id, data) {
  const conn = await connect();
  const escapedContent = conn.escape(data.content);
  const grade = data.grade ? `'${data.grade}'` : null;
  const query = `update reviews set content=${escapedContent}, quality=${data.quality}, difficulty=${data.difficulty}, take_again=${data.take_again}, grade=${grade} where id=${review_id}`;
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function deleteUserReview(review_id) {
  const query = `delete from reviews where id=${review_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getUserComments(user_id) {
  const query = `select c.id as comment_id, c.content as comment_content, c.created_at as comment_created_at, c.updated_at as comment_updated_at, r.id as review_id, r.created_at as review_created_at, r.updated_at as review_updated_at, r.content as review_content, r.department, r.course_number, r.quality, r.difficulty, r.grade, r.take_again, p.name as professor_name, u.name as user_name from comments c inner join reviews r on c.review_id=r.id inner join professors p on r.professor_id=p.id inner join users u on r.user_id=u.id where c.user_id=${user_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function updateUserComment(comment_id, content) {
  const conn = await connect();
  const escapedContent = conn.escape(content);
  const query = `update comments set content=${escapedContent} where id=${comment_id}`;
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function deleteUserComment(comment_id) {
  const query = `delete from comments where id=${comment_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getUserFlags(user_id) {
  const query = `select f.id as flag_id, f.reason, f.created_at as flag_created_at, r.id as review_id, r.created_at as review_created_at, r.updated_at as review_updated_at, r.content as review_content, r.department, r.course_number, r.quality, r.difficulty, r.grade, r.take_again, p.name as professor_name, u.name as user_name from flag_reviews f inner join reviews r on f.review_id=r.id inner join professors p on r.professor_id=p.id inner join users u on r.user_id=u.id where f.user_id=${user_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function deleteUserFlag(flag_id) {
  const query = `delete from flag_reviews where id=${flag_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

module.exports = {
  findOrCreate,
  getUserReviews,
  getUserComments,
  getUserFlags,
  deleteUserReview,
  deleteUserComment,
  deleteUserFlag,
  updateUserReview,
  updateUserComment,
};
