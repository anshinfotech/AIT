const {
  allqueries,
  contactQuerySubmit,
} = require("../Controllers/contactController");

const router = require("express").Router();

router.get("/allcontacts", allqueries).post("/contact-us", contactQuerySubmit);

module.exports = router;
