const mongoose = require("mongoose");

const DB = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://ait:ait@cluster0.elwntta.mongodb.net/data",
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
  
module.exports = DB