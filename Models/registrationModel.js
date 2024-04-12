const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: String,
    father_Name: String,
    mother_Name: String,
    contactNumber: String,
    alternateContactNumber: String,
    email: String,
    collegeName: String,
    branch: String,
    semester: String,
    country: String,
    state: String,
    city: String,
    course: String,
    OtherState: {
      type: String,
      default: "N/A",
    },
    trainingPeriod: String,
    trainingMethod: String,

    uniqueID: String,
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;
