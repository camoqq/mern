const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    // process.exit(0) //sucess
    process.exit(1); // or other number means failure
  }
};

module.exports = connectDB;
