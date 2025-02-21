const userModel = require('../models/userModel'); // Import the userModel

// Get user info
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.id });
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        user.password = undefined; // Remove the password from the response

        res.status(200).send({
            success: true,
            message: "User Found",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error,
        });
    }
};

const updateUserController = async (req, res) => {
    try {
        // find
        const user = await userModel.findById({_id: req.body.id});
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        // update
        const {userName,address,phone} = req.body
        if(userName){
            user.userName = userName
        }
        if(address){
            user.address = address
        }
        if(phone){
            user.phone = phone
        }
        // save user
        await user.save()
        res.status(200).send({
            success: true,
            message: "User Updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update User API",
            error,
        });
    }
};

module.exports = { getUserController, updateUserController };