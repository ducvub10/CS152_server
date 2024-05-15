const {authentication} = require("../utils/authentication.js")

const { 
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
    deleteReviewCritique
} = require("../controllers/reviews");
const router = require("express").Router();

router.get("/:review_id/comments", getReviewComments);
router.get("/:review_id/votes", getReviewVotes);

router.post("/:review_id/comments", authentication, createReviewComment);
router.patch("/:review_id/comments/:comment_id", authentication,updateReviewComment);
router.delete("/:review_id/comments/:comment_id", authentication, deleteReviewComment);

router.post("/:review_id/flagged", authentication,createReviewFlag);
router.patch("/:review_id/flagged/:flagged_id",authentication, updateReviewFlag);
router.delete("/:review_id/flagged/:flagged_id",authentication, deleteReviewFlag);

router.post("/:review_id/critique",authentication, createReviewCritique);
router.patch("/:review_id/critique",authentication, updateReviewCritique);
router.delete("/:review_id/critique", authentication,deleteReviewCritique);

module.exports = router;
