const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: [true, "El nickname es obligatorio"],
        unique: [true, "El nickname ya está en uso"], //revisar que no permita duplicados
        minlength: [3, "El nickname no puede tener menos de 3 caracteres"],
        lowercase: true,
        trim: true
    },
    mail: {
        type: String,
        required: [true, "El mail es obligatorio"],
        unique: [true, "El mail ya está en uso"], 
        match: [/^\S+@\S+\.\S+$/, "Por favor, ingresa un mail válido"],
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    }
}) //Strict true por defecto

module.exports = mongoose.model('User', userSchema)