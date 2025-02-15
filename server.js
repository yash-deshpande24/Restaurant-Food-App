const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Db connection
connectDB();

// Rest object
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log HTTP requests
app.use(express.json()); // Parse JSON request bodies <-- THIS IS CRITICAL

// Routes
// URL => http://localhost:8080
app.get("/", (req, res) => {
    res.send("<h1>Welcome to food app</h1>");
});

// Auth routes
app.use("/api/v1/auth", require("./routes/authRoutes"));

// PORT
const PORT = process.env.PORT || 3000;

// Listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`.yellow.bold);
});