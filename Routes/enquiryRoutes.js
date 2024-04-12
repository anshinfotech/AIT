const {
  allEnquiries,
  submitEnquiry,
} = require("../Controllers/enquiryController");

const router = require("express").Router();
router.get("/allenquiries", allEnquiries).post("/submit-form", submitEnquiry);

module.exports = router;
