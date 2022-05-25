const express = require('express')
const path = require('path')
const ejs = require('ejs')

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
  post
  })


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
app.post('/posts/store', async (req,res)=>{
  await BlogPost.create(req.body)
  res.redirect('/')
  })




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})