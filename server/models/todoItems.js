// import mongoose to create new Schema
const mongoose = require('mongoose');

// Creating Schema
const TodoItemSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }

})



// exporting Schema
module.exports = mongoose.model('todo', TodoItemSchema);
