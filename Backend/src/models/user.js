const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    role: {
        type: String,
        enum: ["admin", "coach", "user"],
        default: "user"
    }
    ,
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
       
    },

    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },

    dateOfBirth: {
        type: Date
    },

    address: {
        street: String,
        city: String,
        state: String,
        country: String
    },

    profileImage: {
        type: String // image URL
    },
     resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },

}, { timestamps: true })

const User = mongoose.model("user", userSchema);
module.exports = User;