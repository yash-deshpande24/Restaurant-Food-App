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
app.use(cors());
app.use(morgan("dev"));

// Routes
// URL => http://localhost:8080
app.get("/", (req, res) => {
    res.send("<h1>Welcome to food app</h1>");
});

// PORT
const PORT = process.env.PORT || 3000;

// Listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`.yellow.bold);
});