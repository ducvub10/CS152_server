const connect = require("./connection");

async function getReviewComments(review_id) {
  const query = `select c.id, c.created_at, c.updated_at, c.content, u.name as user_name from comments c inner join users u on c.user_id=u.id where c.review_id=${review_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
}

async function getReviewVotes(review_id) {
  const query = `select sum(case when upvote=true then 1 else 0 end) as upvote, sum(case when upvote=false then 1 else 0 end) as downvote from user_review_critique where review_id=${review_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows[0];
}

async function getUserReviewVote(review_id, userId) {
  const query = `select upvote from user_review_critique where review_id=${review_id} and user_id=${userId}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  if (rows.length === 0) {
    return { upvote: null };
  }
  return rows[0];
}

async function insertReviewComment(review_id, user_id, data) {
  const conn = await connect();
  const escapedContent = conn.escape(data.content);
  const query = `INSERT INTO comments (review_id, user_id, content) VALUES (${review_id}, ${user_id}, ${escapedContent});`;
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows[0];
}

async function patchReviewComment(review_id, user_id, comment_id, data) {
  const query = `UPDATE comments c SET c.content = '${data.content}' WHERE c.user_id = ${user_id} AND c.review_id = '${review_id}' AND c.id = ${comment_id};`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows[0];
}

async function deleteReviewComment(review_id, user_id, comment_id, data) {
  const query = `DELETE FROM comments c WHERE ${review_id} = c.review_id AND c.id=${comment_id}  AND c.user_id = ${user_id}`;
  const conn = await connect();
  let result = await conn.execute(query);
  conn.end();
  return result;
}

async function insertReviewFlag(review_id, user_id, data) {
  const conn = await connect();
  const escapedReason = conn.escape(data.reason);
  const query = `INSERT INTO flag_reviews (user_id, review_id, reason) values (${user_id}, ${review_id}, ${escapedReason})`;
  let result = await conn.execute(query);
  conn.end();
  return result;
}

async function insertReviewCritique(review_id, user_id, data) {
  const query = `INSERT INTO user_review_critique (user_id, review_id, upvote) VALUES (${user_id}, ${review_id}, ${data.upvote});`;
  const conn = await connect();
  let result = await conn.execute(query);
  conn.end();
  return result;
}

async function patchReviewFlag(review_id, user_id, flagged_id, data) {
  const query = `UPDATE flag_reviews fr SET fr.reason = '${data.reason}' WHERE fr.user_id = ${user_id} AND fr.review_id = '${review_id}' AND fr.id = ${flagged_id};`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows[0];
}

async function patchReviewCritique(review_id, user_id, data) {
  const query = `UPDATE user_review_critique urc SET urc.upvote=${data.upvote} WHERE urc.user_id=${user_id} AND urc.review_id=${review_id}`;
  const conn = await connect();
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows[0];
}

async function deleteReviewFlag(review_id, user_id, flagged_id, data) {
  const query = `DELETE FROM flag_reviews fr WHERE ${review_id} = fr.review_id AND fr.id=${flagged_id}  AND fr.user_id = ${user_id}`;
  const conn = await connect();
  let result = await conn.execute(query);
  conn.end();
  return result;
}

async function deleteReviewCritique(review_id, user_id, data) {
  const query = `DELETE FROM user_review_critique urc WHERE ${review_id}=urc.review_id AND urc.user_id=${user_id}`;
  const conn = await connect();
  let result = await conn.execute(query);
  conn.end();
  return result;
}

module.exports = {
  getReviewComments,
  getReviewVotes,
  insertReviewComment,
  patchReviewComment,
  deleteReviewComment,
  insertReviewFlag,
  insertReviewCritique,
  patchReviewFlag,
  patchReviewCritique,
  deleteReviewFlag,
  deleteReviewCritique,
  getUserReviewVote,
};
