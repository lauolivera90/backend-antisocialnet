const mongoose = require('mongoose')
const imageSchema = require('./image')


const postSchema = new mongoose.Schema({
        description: {
            type: String,
            trim: true,
            required: [true, "A description is required for the post"],
            maxlength: [2200, "The description cannot exceed 2200 characters"]
        },
        upload_date:{
            type: Date,
            default: Date.now,
            validate: {
                validator: function (value) {
                    return value <= new Date();
                },
            message: "The publication date cannot be in the future"
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Missing the ID of the user creating the post"] 
        },
        image: [imageSchema],
        tag: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        }]
}) //Strict true por defecto

module.exports = mongoose.model('Post', postSchema)