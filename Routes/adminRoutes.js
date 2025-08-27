
const {
  createAdmin,
  getLoginPage,
  adminLogin,
  getAdminDashboard,
  verifyAdmin,
  getEnquiryData,
} = require("../Controllers/adminController");
const { requireAdminLogin } = require("../Middlewares/middleware");
const router = require("express").Router();
const Admin = require('../Models/adminModel'); // <-- Add this line

router
  .post("/admin/register", createAdmin)
  .post("/admin/verify", verifyAdmin)
  .get("/admin/login", getLoginPage)
  .get("/admin/enquiry-data", getEnquiryData)
  .get("/admin/dashboard", requireAdminLogin, getAdminDashboard)
  .post("/admin/login", adminLogin);

// === Temporary password reset route ===
router.post("/admin/reset-password", async (req, res) => {
  try {
    const bcrypt = require("bcrypt");
    const hash = await bcrypt.hash("NewPassword123!", 10);

    const result = await Admin.updateOne(
      { email: "admin@example.com" },   // Replace with your real admin email
      { password: hash }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send("Admin not found or password unchanged.");
    }

    res.send("Password updated successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error resetting password.");
  }
});

module.exports = router;
