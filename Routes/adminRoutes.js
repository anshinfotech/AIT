const {
  createAdmin,
  getLoginPage,
  adminLogin,
  getAdminDashboard,
} = require("../Controllers/adminController");
const { requireAdminLogin } = require("../Middlewares/middleware");

const router = require("express").Router();

router
  .post("/admin/register", createAdmin)
  .get("/admin/login", getLoginPage)
  .get("/admin/dashboard",requireAdminLogin,getAdminDashboard )
  .post("/admin/login", adminLogin);

module.exports = router;
