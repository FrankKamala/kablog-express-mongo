const express = require('express')
const path = require('path')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')


const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true})


const app = express()
const port = 3000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(fileUpload())

app.get('/', async(req, res) => {
  const blogposts = await BlogPost.find()
  res.render('index',
  {blogposts:blogposts}
  //or {blogposts}
  )
})
app.get('/about', (req, res) => {
  res.render('about')
})
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/post/:id', async(req, res) => {
 // res.sendFile(path.resolve(__dirname,'public/post.html'))
 const post = await BlogPost.findById(req.params.id)
 res.render('post',{
  post:post
  })
//console.log(post)


 res.render('post')
})
app.get('/posts/new', (req, res) => {
  // res.sendFile(path.resolve(__dirname,'public/post.html'))
  res.render('create')
 })

 app.get('/api/view/posts',async(req,res)=>{
   const allBlogs = await BlogPost.find()
   res.json({allBlogs})
 })
// app.post('/home',  (req, res) =>{
//   res.send('Jungle!')
// })

//saveData
// app.post('/posts/store',(req,res)=>{
//   // model creates a new doc with browser data
//   BlogPost.create(req.body,(error,blogpost)=>{
//     console.log(req.body)
//     res.redirect('/')
//   }
//   )
//   }) drop callback hells
app.post('/posts/store',  (req,res)=>{
  let image = req.files.image;
image.mv(path.resolve(__dirname,'public/img',image.name),async(error)=>{
await BlogPost.create(req.body)
res.redirect('/')
  // await BlogPost.create(req.body)
  // res.redirect('/')
})
  })




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})