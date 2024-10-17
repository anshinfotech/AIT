const { createBlog, deleteBlog, getAllBlogs, getSingleBlog } = require("../Controllers/blogController");


const router = require("express").Router();

router
  .post("/blog", createBlog)
  .get("/single_blog/:id" , getSingleBlog)
  .delete("/blog/:blogId", deleteBlog)
  .get("/getAllBlogs", getAllBlogs);


module.exports = router;
