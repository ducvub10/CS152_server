const {
  getAllCourses,
  getPaginatedCourses,
  getPaginationInfo,
  getCourseDetails,
  getCourseStats,
  getCourseReviews,
  insertCourseReview,
  patchCourseReview,
  deleteCourseReview,
} = require("../daos/courses");
const {
  queryReviewComments,
  queryReviewVotes,
  queryUserReviewVote,
} = require("./reviews");

async function queryCourses(
  page,
  limit,
  department,
  course_number,
  course_name
) {
  const data = await getPaginatedCourses(
    page,
    limit,
    department,
    course_number,
    course_name
  );
  if (data.length === 0) {
    return {
      data,
      pagination: null,
    };
  }
  const total_pages = await getPaginationInfo(
    limit,
    department,
    course_number,
    course_name
  );
  return {
    data,
    pagination: { start: 1, end: total_pages },
  };
}

async function queryCourse(department, course_number) {
  const course = await getCourseDetails(department, course_number);
  if (!course) {
    return null;
  }
  const stats = await getCourseStats(department, course_number);

  return { course_data: course, course_stats: stats };
}

async function queryCourseDetails(department, course_number) {
  const course = await getCourseDetails(department, course_number);
  if (!course) {
    return null;
  }
  return { data: course };
}

async function queryCourseStats(department, course_number) {
  const stats = await getCourseStats(department, course_number);
  return { stats };
}

async function queryCourseReviews(department, course_number, user_id) {
  const reviews = await getCourseReviews(department, course_number);
  for (const i in reviews) {
    const review = reviews[i];
    const { votes } = await queryReviewVotes(review.id);
    const userVote = await queryUserReviewVote(review.id, user_id);
    review.votes = votes;
    review.votes.userVote = userVote;
  }
  return { reviews };
}

async function queryCourseReviewsWithComments(
  department,
  course_number,
  user_id
) {
  const { reviews } = await queryCourseReviews(
    department,
    course_number,
    user_id
  );
  for (const i in reviews) {
    const review = reviews[i];
    const { comments } = await queryReviewComments(review.id);
    review.comments = comments;
  }

  return { reviews };
}

async function insertCourseReviewQuery(
  data,
  department,
  course_number,
  user_id
) {
  return await insertCourseReview(data, department, course_number, user_id);
}

async function updateReviewQuery(
  data,
  department,
  course_number,
  review_id,
  user_id
) {
  return await patchCourseReview(
    data,
    department,
    course_number,
    review_id,
    user_id
  );
}

async function deleteReviewQuery(
  review_id,
  department,
  course_number,
  user_id
) {
  return await deleteCourseReview(
    review_id,
    department,
    course_number,
    user_id
  );
}

module.exports = {
  queryCourses,
  queryCourse,
  queryCourseDetails,
  queryCourseStats,
  queryCourseReviews,
  queryCourseReviewsWithComments,
  insertCourseReviewQuery,
  updateReviewQuery,
  deleteReviewQuery,
};
