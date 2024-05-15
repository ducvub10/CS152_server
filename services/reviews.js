const {
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
} = require("../daos/reviews");

async function queryReviewComments(review_id) {
  const comments = await getReviewComments(review_id);
  return { comments };
}

async function queryReviewVotes(review_id) {
  const votes = await getReviewVotes(review_id);
  return { votes };
}

async function queryUserReviewVote(review_id, user_id) {
  if (!user_id || !review_id) {
    return null;
  }
  const { upvote } = await getUserReviewVote(review_id, user_id);
  return upvote;
}

async function insertCommentQuery(review_id, user_id, data) {
  return await insertReviewComment(review_id, user_id, data);
}
async function updateCommentQuery(review_id, user_id, comment_id, data) {
  return await patchReviewComment(review_id, user_id, comment_id, data);
}

async function deleteCommentQuery(review_id, user_id, comment_id, data) {
  return await deleteReviewComment(review_id, user_id, comment_id, data);
}

async function createReviewFlagQuery(review_id, user_id, comment_id, data) {
  return await insertReviewFlag(review_id, user_id, comment_id, data);
}

async function createReviewCritiqueQuery(review_id, user_id, comment_id, data) {
  return await insertReviewCritique(review_id, user_id, comment_id, data);
}

async function updateReviewFlagQuery(review_id, user_id, flagged_id, data) {
  return await patchReviewFlag(review_id, user_id, flagged_id, data);
}
async function updateReviewCritiqueQuery(review_id, user_id, data) {
  return await patchReviewCritique(review_id, user_id, data);
}

async function deleteReviewFlagQuery(review_id, user_id, flagged_id, data) {
  return await deleteReviewFlag(review_id, user_id, flagged_id, data);
}

async function deleteReviewCritiqueQuery(review_id, user_id, data) {
  return await deleteReviewCritique(review_id, user_id, data);
}

module.exports = {
  queryReviewComments,
  queryReviewVotes,
  queryUserReviewVote,
  insertCommentQuery,
  updateCommentQuery,
  deleteCommentQuery,
  createReviewFlagQuery,
  createReviewCritiqueQuery,
  updateReviewFlagQuery,
  updateReviewCritiqueQuery,
  deleteReviewFlagQuery,
  deleteReviewCritiqueQuery,
};
