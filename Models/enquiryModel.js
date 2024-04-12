const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    college: { type: String, required: true },
    address: { type: String, required: true },
    coursePDF: { type: String, required: true, default: "Yes" },
    course: { type: String, required: true },
    uniqueID: String,
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiries", enquirySchema);
module.exports = Enquiry;
