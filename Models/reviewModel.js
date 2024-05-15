const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      reuired: true,
    },
    review: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    show:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

const reviewModel = mongoose.model("Reviews",reviewSchema)

module.exports=reviewModel
