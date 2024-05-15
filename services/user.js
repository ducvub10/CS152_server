const {
  getUserReviews,
  getUserComments,
  getUserFlags,
  deleteUserReview,
  deleteUserComment,
  deleteUserFlag,
  updateUserReview,
  updateUserComment,
} = require("../daos/user");

async function queryUserReviews(user_id) {
  const reviews = await getUserReviews(user_id);
  return { reviews };
}

async function queryUserComments(user_id) {
  const comments = await getUserComments(user_id);
  return { comments };
}

async function queryUserFlags(user_id) {
  const flags = await getUserFlags(user_id);
  return { flags };
}

async function queryUpdateUserReview(review_id, data) {
  await updateUserReview(review_id, data);
}

async function queryUpdateUserComment(comment_id, content) {
  await updateUserComment(comment_id, content);
}

async function removeUserReview(review_id) {
  await deleteUserReview(review_id);
}

async function removeUserComment(comment_id) {
  await deleteUserComment(comment_id);
}

async function removeUserFlag(flag_id) {
  await deleteUserFlag(flag_id);
}

module.exports = {
  queryUserReviews,
  queryUserComments,
  queryUserFlags,
  removeUserReview,
  removeUserComment,
  removeUserFlag,
  queryUpdateUserReview,
  queryUpdateUserComment,
};
