const {
  queryProfessors,
  queryProfessor,
  queryProfessorDetails,
  queryProfessorStats,
  queryProfessorReviews,
  queryProfessorReviewsWithComments,
  insertProfessorReviewQuery,
} = require("../services/professors");

async function getProfessors(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || "";
    const projection = req.query.projection || "*";
    const data = await queryProfessors(page, limit, name, projection);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getProfessor(req, res) {
  try {
    const professor_id = req.params.professor_id;
    const data = await queryProfessor(professor_id);
    if (!data) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getProfessorDetails(req, res) {
  try {
    const professor_id = req.params.professor_id;
    const data = await queryProfessorDetails(professor_id);
    if (!data) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
async function getProfessorStats(req, res) {
  try {
    const professor_id = req.params.professor_id;
    const data = await queryProfessorStats(professor_id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getProfessorReviews(req, res) {
  try {
    const professor_id = req.params.professor_id;
    const comments = req.query.comments === "True";
    const user_id = req.user?.id;

    let data;
    if (comments) {
      data = await queryProfessorReviewsWithComments(professor_id, user_id);
    } else {
      data = await queryProfessorReviews(professor_id, user_id);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function createProfessorReview(req, res) {
  try {
    const professor_id = req.params.professor_id;
    const user_id = req.user.id;
    let data = req.body;
    await insertProfessorReviewQuery(data, professor_id, user_id);

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getProfessors,
  getProfessor,
  getProfessorDetails,
  getProfessorStats,
  getProfessorReviews,
  createProfessorReview,
};
