const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connection Successful");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToMongoDB;
