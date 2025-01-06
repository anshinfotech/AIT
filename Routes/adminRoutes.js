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

router
  .post("/admin/register", createAdmin)
  .post("/admin/verify", verifyAdmin)
  .get("/admin/login", getLoginPage)
  .get("/admin/enquiry-data", getEnquiryData)
  .get("/admin/dashboard", requireAdminLogin, getAdminDashboard)
  .post("/admin/login", adminLogin);

module.exports = router;
