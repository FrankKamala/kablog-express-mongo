const User = require('../models/User')

module.exports=(req,res,next)=>{
    User.findById(req.session.UserId,(error,user)=>{

        if(error||!user){
            return res.redirect('/')
        }
        else{next()}
    })
}