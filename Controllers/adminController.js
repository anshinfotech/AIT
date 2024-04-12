const adminModel = require("../Models/adminModel");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  const existingAdmin = await adminModel.findOne({ email });

  if (existingAdmin) {
    res
      .status(200)
      .send({ success: false, message: "Admin already registered" });
    return;
  }

  const securePassword = bcrypt.hashSync(password, 15);
  try {
    const admin = await adminModel.create({
      username,
      password: securePassword,
      email,
    });
    res.status(200).send({
      success: true,
      data: admin,
      message: "Admin Created Successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
const getAdminPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "admin.html"));
};
const getLoginPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Alogin.html"));
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .send({ success: false, message: "Admin not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid password" });
    }

    // Create a JWT token for admin authentication
    const token = jwt.sign({ id: admin._id }, "process.env.JWT_SECRET", {
      expiresIn: "1h",
    });

    // Set token as a cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration

    res.status(200).send({
      success: true,
      message: "Login successful",
      redirectTo: "/api/admin/dashboard",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
const getAdminDashboard = (req,res)=>{
  res.sendFile(path.join(__dirname, "../public", "admin.html"));
}
module.exports = { createAdmin, getAdminPage, getLoginPage, adminLogin ,getAdminDashboard};
