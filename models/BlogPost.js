const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({

    title:String,
    body:String,
    author: String,
    dateCreated:{
        type:Date, 
        default: new Date()}
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);

module.exports = BlogPost