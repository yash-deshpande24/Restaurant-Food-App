const express = require("express");
const router = express.Router();
const { getUserController, updateUserController, resetPasswordController } = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

// routes
// Get use || GET
router.get('/getUser',authMiddleware, getUserController)

// update profile
router.put('/updateUser',authMiddleware,updateUserController)

//reset password
router.post('/resetPassword',authMiddleware,resetPasswordController)

module.exports = router;