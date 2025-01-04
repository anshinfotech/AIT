const {
  allEnquiries,
  submitEnquiry,
  downloadExcel,
  courseEnquiryMethod,
} = require("../Controllers/enquiryController");

const router = require("express").Router();

router
  .get("/allenquiries", allEnquiries)
  .post("/submit-form", submitEnquiry)
  .get("/downloadenquiry", downloadExcel)
  .post('/student-enquiry' , courseEnquiryMethod);

module.exports = router;
