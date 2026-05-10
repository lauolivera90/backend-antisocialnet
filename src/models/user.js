const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
        select: false
    },
    avatar: { 
        type: String, 
        default: '' 
    },
}) //Strict true por defecto

// Hook para hashear la contraseña antes de guardar el usuario
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar la contraseña ingresada con la almacenada
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema)