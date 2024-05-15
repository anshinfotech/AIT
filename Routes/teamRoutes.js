const { createEmployee, deleteEmployee, updateEmployee, getAllEmployees } = require("../Controllers/teamController");


const router = require("express").Router();

router
  .post("/employees", createEmployee)
  .delete("/employees/:employeeId", deleteEmployee)
  .put("/employees/:employeeId", updateEmployee)
  .get("/employees", getAllEmployees);

module.exports = router;
