const User = require('../models/User.js')
const path = require('path')
module.exports = (req,res)=>{
User.create(req.body, (error, user) => {
    if(error){
        console.log(error)
        return res.redirect('auth/signUp')
    }
res.redirect('/')
})
}