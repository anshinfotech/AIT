const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../Controllers/reviewController");

const router = require("express").Router();

router
  .get("/getreviews", getReviews)
  .post("/create-review", createReview)
  .put("/update-review/:id", updateReview)
  .delete("/delete-review/:id", deleteReview);

module.exports = router;
