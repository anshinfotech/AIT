const { createBlog, deleteBlog, getAllBlogs } = require("../Controllers/blogController");


const router = require("express").Router();

router
  .post("/blog", createBlog)
  .delete("/blog/:blogId", deleteBlog)
  .get("/blog", getAllBlogs);

module.exports = router;
