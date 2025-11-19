const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Mongoose ko bol rahe hain ki connect karo
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Agar connect nahi hua, toh process band kar do (Failure)
  }
};

module.exports = connectDB; // Is function ko export kiya taaki server.js mein use kar sakein