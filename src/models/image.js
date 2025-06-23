const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        require: [true, "La url es requerida"],
        trim: true
        //revisar si falta algo
    },
})

module.exports = imageSchema