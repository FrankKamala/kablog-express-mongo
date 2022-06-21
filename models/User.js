const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema =  new Schema({
 first_name:String,
 second_name : String,
 username : String,
 password : String




});
 //achia model
 const User =mongoose.model(User,UserSchema);
 module.exports = User;