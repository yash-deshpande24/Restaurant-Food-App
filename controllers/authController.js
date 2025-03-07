const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address,answer } = req.body;

        // Validation
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields",
            });
        }

        // Check user
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(400).send({
                success: false,
                message: "Email already registered. Please login.",
            });
        }

        // Hash password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
            answer
        });

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in register controller",
            error: error.message,
        });
    }
};

// login
const loginController = async(req, res) => {
    try {
        const {email, password} = req.body
        //validation
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: "Please provide email and password"
            })
        }

        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found",
            })
        }

        //check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",
            })
        }
        //token
        const token = JWT.sign({
            id: user._id,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        user.password = undefined; 
        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error: error.message
        });
    }
};

module.exports = { registerController, loginController }; // Export as an object