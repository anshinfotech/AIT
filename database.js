const mongoose = require("mongoose");

const DB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anshinfotech1:f8QiKYpsDE53Cs6l@cluster0.iqayfbm.mongodb.net/ait",
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
