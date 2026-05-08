const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        require: [true, "The URL is required"],
        trim: true
        //revisar si falta algo
    },
})

module.exports = imageSchema