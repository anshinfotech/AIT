const {
  allEnquiries,
  submitEnquiry,
  downloadExcel,
  courseEnquiryMethod,
  getAllCounsellingEnquiries,
} = require("../Controllers/enquiryController");

const router = require("express").Router();

router
  .get("/allenquiries", allEnquiries)
  .post("/submit-form", submitEnquiry)
  .get("/downloadenquiry", downloadExcel)
  .post('/student-enquiry' , courseEnquiryMethod)
  .get('/get-all-enquries' , getAllCounsellingEnquiries);

module.exports = router;
