const BlogPost = require('../models/BlogPost.js')
module.exports=async(req,res)=>{ // res.sendFile(path.resolve(__dirname,'public/post.html'))
    const post = await BlogPost.findById(req.params.id)
    res.render('post',{
     post:post
     })
   //console.log(post)
   
   
    res.render('post')
}