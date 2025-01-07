const mongoose = require("mongoose");

const courseEnquiry = new mongoose.Schema({
  name: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  mobile: { type: Number },
  altmobile: { type: Number },
  dob: { type: Date },
  email: { type: String },
  gender: { type: String },
  course: { type: String },
  review: { type: String },
  address: { type: String },
  enqFor: { type: String },
});

const courseModel = new mongoose.model("courseEnquiries", courseEnquiry);

module.exports = {
  courseModel,
};
