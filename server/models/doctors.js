const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    doctorImage: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
   
})

module.exports = mongoose.model('Post', PostSchema);