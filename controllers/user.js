const {
  queryUserReviews,
  queryUserComments,
  queryUserFlags,
  removeUserReview,
  removeUserComment,
  removeUserFlag,
  queryUpdateUserReview,
  queryUpdateUserComment,
} = require("../services/user");

async function getUserReviews(req, res) {
  try {
    const user_id = req.user.id;
    data = await queryUserReviews(user_id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getUserComments(req, res) {
  try {
    const user_id = req.user.id;
    data = await queryUserComments(user_id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getUserFlags(req, res) {
  try {
    const user_id = req.user.id;
    data = await queryUserFlags(user_id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function patchUserReview(req, res) {
  try {
    const review_id = req.params.review_id;
    const data = req.body;
    await queryUpdateUserReview(review_id, data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function patchUserComment(req, res) {
  try {
    const comment_id = req.params.comment_id;
    const content = req.body.content;
    await queryUpdateUserComment(comment_id, content);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteUserReview(req, res) {
  try {
    const review_id = req.params.review_id;
    await removeUserReview(review_id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteUserComment(req, res) {
  try {
    const comment_id = req.params.comment_id;
    await removeUserComment(comment_id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteUserFlag(req, res) {
  try {
    const flag_id = req.params.flag_id;
    await removeUserFlag(flag_id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getUserReviews,
  getUserComments,
  getUserFlags,
  deleteUserReview,
  deleteUserComment,
  deleteUserFlag,
  patchUserReview,
  patchUserComment,
};
