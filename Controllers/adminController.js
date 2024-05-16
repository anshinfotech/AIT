const adminModel = require("../Models/adminModel");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "anshinfotech1@gmail.com",
    pass: "lcooffigfklnztpl",
  },
});

const createAdmin = async (req, res) => {
  const otp = Math.round(Math.random() * 100000);
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
      otp,
    });
    await transporter.sendMail({
      from: "anshinfotech1@gmail.com", // sender address
      to: email, // recipient
      subject: "Thank you for your enquiry", // Subject line
      text: `Please Verify Your Account`, // Plain text body
      // You can also include HTML content
      html: `<html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for your enquiry</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333;
                  text-align: center;
                  margin-bottom: 20px;
              }
              p {
                  color: #666;
                  line-height: 1.6;
                  margin-bottom: 20px;
              }
              .otp {
                  background-color: #007bff;
                  color: #fff;
                  text-align: center;
                  font-size: 24px;
                  padding: 15px 0;
                  border-radius: 5px;
                  margin-bottom: 20px;
              }
              .note {
                  color: #999;
                  font-size: 14px;
              }
              .signature {
                  text-align: center;
                  margin-top: 20px;
                  font-style: italic;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Thank you for registering at AIT</h1>
              <p>Plesae Verify Your Otp  to Activate your Account.</p>
              <div class="otp">OTP:- <strong>${otp}</strong></div>
              <p class="note">This is an auto-generated email, please do not reply to this email.</p>
              <p class="signature">Best Regards,<br>Ansh Infotech Team</p>
          </div>
      </body>
      </html>`,
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

const verifyAdmin = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found!" });
    }
    if (admin.otp === otp) {
      admin.otp = null;
      admin.verified = true;
      admin.save()
      res.status(200).send({ message: "Verification Successfull", admin });
      return;
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
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
    if (!admin.verified && !admin.otp) {
      return res
        .status(403)
        .send({ success: false, message: "Please verify your account" });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid password" });
    }

    // Create a JWT token for admin authentication
    const token = jwt.sign({ id: admin._id }, "secret", {
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

const getAdminDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "admin.html"));
};
module.exports = {
  createAdmin,
  getAdminPage,
  getLoginPage,
  adminLogin,
  getAdminDashboard,
  verifyAdmin,
};
