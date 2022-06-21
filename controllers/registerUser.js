const User = require('../models/User')
const path = reqiure('path')

module.exports = (req,res)=>{
    User.create(re.body,(error,userMjamo)=>{
        res.redirect('/')
    })
    
}