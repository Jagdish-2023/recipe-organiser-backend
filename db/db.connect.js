const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const initializeDB = async () => {
  try {
    const response = await mongoose.connect(mongoURI);
    if (response) {
      console.log("Database Connected Successfully.");
    }
  } catch (error) {
    console.log("Failed to connect to Database.", error);
  }
};

module.exports = initializeDB;
