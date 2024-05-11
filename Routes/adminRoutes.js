const {
  createAdmin,
  getLoginPage,
  adminLogin,
  getAdminDashboard,
  verifyAdmin,
} = require("../Controllers/adminController");
const { requireAdminLogin } = require("../Middlewares/middleware");

const router = require("express").Router();

router
  .post("/admin/register", createAdmin)
  .post("/admin/verify", verifyAdmin)
  .get("/admin/login", getLoginPage)
  .get("/admin/dashboard",requireAdminLogin,getAdminDashboard )
  .post("/admin/login", adminLogin);

module.exports = router;
