const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {type:String,required:true},
    father_Name: {type:String,required:true},
    mother_Name: {type:String,required:true},
    contactNumber: {type:String,required:true},
    alternateContactNumber: {type:String,required:true},
    email: {type:String,required:true},
    collegeName: {type:String,required:true},
    branch: {type:String,required:true},
    semester: {type:String,required:true},
    country: {type:String,required:true},
    state: {type:String,required:true},
    city: {type:String,required:true},
    course: {type:String,required:true},
    OtherState: {
      type: String,
      default: "N/A",
      required:true
    },
    trainingPeriod: {type:String,required:true},
    trainingMethod: {type:String,required:true},

    uniqueID: String,
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;
