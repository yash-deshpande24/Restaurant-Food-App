const mongoose = require("mongoose");
const colors = require("colors");

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error:", error.message.red.bold);
        process.exit(1);
    }
};

module.exports = connectDB;