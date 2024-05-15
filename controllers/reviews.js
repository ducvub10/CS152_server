const {
  queryReviewComments,
  queryReviewVotes,
  insertCommentQuery,
  updateCommentQuery,
  deleteCommentQuery,
  createReviewFlagQuery,
  updateReviewFlagQuery,
  createReviewCritiqueQuery,
  updateReviewCritiqueQuery,
  deleteReviewFlagQuery,
  deleteReviewCritiqueQuery,
} = require("../services/reviews");

async function getReviewComments(req, res) {
  try {
    const review_id = req.params.review_id;
    if (!review_id) {
      return res.status(404).json({ message: "Review not found" });
    }
    const data = await queryReviewComments(review_id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getReviewVotes(req, res) {
  try {
    const review_id = req.params.review_id;
    if (!review_id) {
      return res.status(404).json({ message: "Review not found" });
    }
    const data = await queryReviewVotes(review_id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function createReviewComment(req, res) {
  try {
    const review_id = req.params.review_id;
    const user_id = req.user.id;
    let data = req.body;
    let result = await insertCommentQuery(review_id, user_id, data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updateReviewComment(req, res) {
  try {
    const review_id = req.params.review_id;
    const user_id = req.user.id;
    const comment_id = req.params.comment_id;
    let data = req.body;
    let result = await updateCommentQuery(review_id, user_id, comment_id, data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteReviewComment(req, res) {
  try {
    const review_id = req.params.review_id;
    const user_id = req.user.id;
    const comment_id = req.params.comment_id;
    const data = req.body;
    let result = await deleteCommentQuery(review_id, user_id, comment_id, data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function createReviewFlag(req, res) {
  try {
    const review_id = req.params.review_id;
    const user_id = req.user.id;
    const data = req.body;
    let result = await createReviewFlagQuery(review_id, user_id, data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updateReviewFlag(req, res) {
  try {
    const review_id = req.params.review_id;
    const user_id = req.user.id;
    const flagged_id = req.params.flagged_id;
    let data = req.body;
    let result = await updateReviewFlagQuery(
      review_id,
      user_id,
      flagged_id,
      data
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteReviewFlag(req, res) {
  try {
    const review_id = req.params.review_id;
    const user_id = req.user.id;
    const flagged_id = req.params.flagged_id;
    const data = req.body;
    let result = await deleteReviewFlagQuery(
      review_id,
      user_id,
      flagged_id,
      data
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function createReviewCritique(req, res) {
  try {
    const review_id = req.params.review_id;
    const user_id = req.user.id;
    const data = req.body;
    let result = await createReviewCritiqueQuery(review_id, user_id, data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updateReviewCritique(req, res) {
  try {
    const review_id = req.params.review_id;
    const user_id = req.user.id;
    let data = req.body;
    let result = await updateReviewCritiqueQuery(review_id, user_id, data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteReviewCritique(req, res) {
  try {
    const review_id = req.params.review_id;
    const user_id = req.user.id;
    const data = req.body;
    let result = await deleteReviewCritiqueQuery(review_id, user_id, data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getReviewComments,
  getReviewVotes,
  createReviewComment,
  updateReviewComment,
  deleteReviewComment,
  createReviewFlag,
  updateReviewFlag,
  deleteReviewFlag,
  createReviewCritique,
  updateReviewCritique,
  deleteReviewCritique,
};
