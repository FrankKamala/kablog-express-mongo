const BlogPost = require('../models/BlogPost.js')
const path = require('path')
module.exports=(req,res)=>{
    let image = req.files.image;
image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{
await BlogPost.create({
...req.body,
image: '/img/' + image.name
})
res.redirect('/')
})

}
//add ‘ .. ’ to path.resolve
//because we have to go up one folder before referring to public/img.