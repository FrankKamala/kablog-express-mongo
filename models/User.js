const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

const UserSchema =  new Schema({
 first_name:String,
 second_name : String,
 username : String,
 password : String





});
UserSchema.pre('save',function(next){
    const user = this;
    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password=hash
        next()
    })
     
})
 //achia model
 const User =mongoose.model('User',UserSchema);
 module.exports = User;