const {
  allqueries,
  contactQuerySubmit,
  downloadExcel,
} = require("../Controllers/contactController");

const router = require("express").Router();

router
  .get("/allcontacts", allqueries)
  .post("/contact-us", contactQuerySubmit)
  .get("/downloadcontacts", downloadExcel);

module.exports = router;
