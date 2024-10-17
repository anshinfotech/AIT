const mongoose = require("mongoose");
require("dotenv").config();

const DB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
      }
    );
    console.log("databse connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DB;
