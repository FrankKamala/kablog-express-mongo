module.exports=(req,res)=>{
  if(req.session.userId){
    console.log(req.session)
    res.render('create')
  }else {res.redirect('/auth/signIn')}

}