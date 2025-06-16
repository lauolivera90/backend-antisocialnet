const mongoose = require('mongoose')
const imageSchema = require('./image')

const postSchema = new mongoose.Schema({
        description: {
            type: String,
            trim: true,
            required: [true, "Se requiere una descripcion para la publición"],
            maxlength: [2200, "La descripción no puede exceder los 2200 caracteres"]
        },
        upload_date:{
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Falta el id del usuario que hace la publicación"] 
        },
        image: [imageSchema]
}) //Strict true por defecto

module.exports = mongoose.model('Post', postSchema)