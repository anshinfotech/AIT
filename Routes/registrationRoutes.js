const {
  registerStudent,
  getStudentDetails,
  deleteStudentDetail,
} = require("../Controllers/registerController");

const router = require("express").Router();

router
  .post("/register", registerStudent)
  .get("/allStudents", getStudentDetails)
  .delete("/delete/:id", deleteStudentDetail);

module.exports = router;
