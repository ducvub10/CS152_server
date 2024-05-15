const {
  getAllProfessors,
  getPaginatedProfessors,
  getPaginationInfo,
  getProfessorDetails,
  getProfessorStats,
  getProfessorReviews,
  insertProfessorReview,
} = require("../daos/professors");
const {
  queryReviewComments,
  queryReviewVotes,
  queryUserReviewVote,
} = require("./reviews");

async function queryProfessors(page, limit, name, projection) {
  const data = await getPaginatedProfessors(page, limit, name, projection);
  if (data.length === 0) {
    return {
      data,
      pagination: null,
    };
  }
  const total_pages = await getPaginationInfo(limit, name);
  return {
    data,
    pagination: { start: 1, end: total_pages },
  };
}

async function queryProfessor(professor_id) {
  const professor = await getProfessorDetails(professor_id);
  if (!professor) {
    return null;
  }
  const stats = await getProfessorStats(professor_id);

  return { professor_data: professor, professor_stats: stats };
}

async function queryProfessorDetails(professor_id) {
  const professor = await getProfessorDetails(professor_id);
  if (!professor) {
    return null;
  }
  return { data: professor };
}

async function queryProfessorStats(professor_id) {
  const stats = await getProfessorStats(professor_id);
  return { stats };
}

async function queryProfessorReviews(professor_id, user_id) {
  const reviews = await getProfessorReviews(professor_id);
  for (const i in reviews) {
    const review = reviews[i];
    const { votes } = await queryReviewVotes(review.id);
    const userVote = await queryUserReviewVote(review.id, user_id);
    review.votes = votes;
    review.votes.userVote = userVote;
  }
  return { reviews };
}

async function queryProfessorReviewsWithComments(professor_id, user_id) {
  const { reviews } = await queryProfessorReviews(professor_id, user_id);
  for (const i in reviews) {
    const review = reviews[i];
    const { comments } = await queryReviewComments(review.id);
    review.comments = comments;
  }

  return { reviews };
}

async function insertProfessorReviewQuery(data, professor_id, user_id) {
  return await insertProfessorReview(data, professor_id, user_id);
}

module.exports = {
  queryProfessors,
  queryProfessor,
  queryProfessorDetails,
  queryProfessorStats,
  queryProfessorReviews,
  queryProfessorReviewsWithComments,
  insertProfessorReviewQuery,
};
