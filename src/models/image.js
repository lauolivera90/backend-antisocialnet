const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        require: [true, "La url es requerida"],
        trim: true
        //revisar si falta algo
    },
    /* post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }*/
}) //Stric true por defecto

module.exports = imageSchema