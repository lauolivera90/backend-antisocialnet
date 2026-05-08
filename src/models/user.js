const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: [true, "Nickname is required"],
        unique: [true, "Nickname is already in use"], 
        minlength: [3, "Nickname cannot be less than 3 characters"],
        lowercase: true,
        trim: true
    },
    mail: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already in use"], 
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    }
}) //Strict true por defecto

module.exports = mongoose.model('User', userSchema)