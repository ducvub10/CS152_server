const {
  queryCourses,
  queryCourse,
  queryCourseDetails,
  queryCourseReviews,
  queryCourseStats,
  queryCourseReviewsWithComments,
  insertCourseReviewQuery,
  updateReviewQuery,
  deleteReviewQuery,
} = require("../services/courses");

async function getCourses(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const department = req.query.department || "";
    const course_number = req.query.course_number || "";
    const course_name = req.query.course_name || "";

    const data = await queryCourses(
      page,
      limit,
      department,
      course_number,
      course_name
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getCourse(req, res) {
  try {
    const course = req.params.course?.split("-");
    if (course && course.length !== 2) {
      return res.status(404).json({ message: "Course not found" });
    }
    const department = course[0];
    const course_number = course[1];
    const data = await queryCourse(department, course_number);
    if (!data) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
async function getCourseDetails(req, res) {
  try {
    const course = req.params.course?.split("-");
    if (course && course.length !== 2) {
      return res.status(404).json({ message: "Course not found" });
    }
    const department = course[0];
    const course_number = course[1];
    const data = await queryCourseDetails(department, course_number);
    if (!data) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
async function getCourseStats(req, res) {
  try {
    const course = req.params.course?.split("-");
    if (course && course.length !== 2) {
      return res.status(404).json({ message: "Course not found" });
    }
    const department = course[0];
    const course_number = course[1];
    const data = await queryCourseStats(department, course_number);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getCourseReviews(req, res) {
  try {
    const course = req.params.course?.split("-");
    if (course && course.length !== 2) {
      return res.status(404).json({ message: "Course not found" });
    }
    const department = course[0];
    const course_number = course[1];
    const comments = req.query.comments === "True";
    const user_id = req.user?.id;

    let data;
    if (comments) {
      data = await queryCourseReviewsWithComments(
        department,
        course_number,
        user_id
      );
    } else {
      data = await queryCourseReviews(department, course_number, user_id);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function createCourseReview(req, res) {
  try {
    const course = req.params.course?.split("-");
    if (course && course.length !== 2) {
      return res.status(404).json({ message: "Course not found" });
    }
    const department = course[0];
    const course_number = course[1];
    const user_id = req.user.id;
    let data = req.body;
    await insertCourseReviewQuery(data, department, course_number, user_id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updateCourseReview(req, res) {
  try {
    const course = req.params.course?.split("-");
    if (course && course.length !== 2) {
      return res.status(404).json({ message: "Course not found" });
    }
    const department = course[0];
    const course_number = course[1];
    const user_id = req.user.id;
    const review_id = req.params.review_id;
    let data = req.body;
    let result = await updateReviewQuery(
      data,
      department,
      course_number,
      review_id,
      user_id
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteCourseReview(req, res) {
  try {
    const course = req.params.course?.split("-");
    if (course && course.length !== 2) {
      return res.status(404).json({ message: "Course not found" });
    }
    const department = course[0];
    const course_number = course[1];
    const user_id = req.user.id;
    const review_id = req.params.review_id;
    let result = await deleteReviewQuery(
      review_id,
      department,
      course_number,
      user_id
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getCourses,
  getCourse,
  getCourseReviews,
  getCourseDetails,
  getCourseStats,
  createCourseReview,
  updateCourseReview,
  deleteCourseReview,
};
