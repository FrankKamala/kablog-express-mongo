const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({

    title:String,
    body:String,
    user: String,
    dateCreated:{
        type:Date, 
        default: newDate()}
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);

module.exports = BlogPost