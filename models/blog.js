const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    snippet:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{timestamps:true}) ;

//make a model based on schema
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;