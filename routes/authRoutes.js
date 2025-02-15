const express = require("express");
const router = express.Router();
const { registerController, loginController } = require("../controllers/authController"); // Destructure here

// POST /api/v1/auth/register
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController);

module.exports = router;