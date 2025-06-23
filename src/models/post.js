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
            default: Date.now,
            validate: {
                validator: function (value) {
                    return value <= new Date();
                },
            message: "La fecha de publicación no puede ser en el futuro"
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Falta el id del usuario que hace la publicación"] 
        },
        image: [imageSchema],
        tag: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        }]
}) //Strict true por defecto

module.exports = mongoose.model('Post', postSchema)