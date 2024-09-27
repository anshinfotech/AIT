const blogModel = require("../Models/blogModel");

const createBlog = async (req, res) => {
  const { title, photo, description, content } = req.body;
  try {
    const newBlog = await blogModel.create({
      title,
      photo,
      description,
      content,
    });
    return res
      .status(201)
      .json({ success: true, message: "Blog Added", newBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const deletedBlog = await blogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res.json({
      success: true,
      message: "Blog deleted",
      deletedBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const Blogs = await blogModel.find();
    return res.json({ success: true, Blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  deleteBlog,
};
