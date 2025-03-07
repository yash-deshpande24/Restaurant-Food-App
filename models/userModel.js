const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: { // Changed from `phoneNumber` to `phone`
        type: String,
        required: true,
    },
    address: { // Allow array of strings
        type: Array,
        required: true,
    },
    usertype: {
        type: String,
        required: [true, "user type is required"],
        default: "client",
        enum: ["client", "admin", "vendor", "deliveryboy"],
    },
    profile:{
        type: String,
        default: "data:image/jpeg;base64,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"
    },
    answer:{
        type: String,
        required: [true, "Answer is required"]
    },
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);