const {
  allEnquiries,
  submitEnquiry,
  downloadExcel,
} = require("../Controllers/enquiryController");

const router = require("express").Router();
router.get("/allenquiries", allEnquiries).post("/submit-form", submitEnquiry).get("/downloadenquiry",downloadExcel)

module.exports = router;
