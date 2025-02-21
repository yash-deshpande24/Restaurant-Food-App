const express = require("express");
const router = express.Router();
const { getUserController, updateUserController } = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

// routes
// Get use || GET
router.get('/getUser',authMiddleware, getUserController)

// update profile
router.put('/updateUser',authMiddleware,updateUserController)

module.exports = router;