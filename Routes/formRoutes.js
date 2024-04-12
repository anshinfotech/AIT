const { coursesubmit, getCourses } = require("../Controllers/formController");

const router = require("express").Router();

router.post("/coursesubmit", coursesubmit).get("/courses", getCourses);

module.exports = router;
