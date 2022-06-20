const express = require('express')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const validateMiddleWare = (req,res,next)=>{
  if(req.files == null || req.body.title == null || req.body.title == null){
  return res.redirect('/posts/new')
  }
  next()
  }

  // from cont
  const newPostController = require('./controllers/newPost')
  const aboutController = require('./controllers/aboutPage')
  const contactController =  require('./controllers/contactPage')
  const savePostController = require('./controllers/storePosts')
  const getPostController = require('./controllers/getSinglePost')


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
app.use('/posts/store',validateMiddleWare)

app.get('/', async(req, res) => {
  const blogposts = await BlogPost.find()
  res.render('index',
  {blogposts:blogposts}
  //or {blogposts}
  )
})
// app.get('/about', (req, res) => {
//   res.render('about')
// })
app.get('/about',aboutController)
app.get('/contact',contactController)
app.get('/post/:id',getPostController)
app.post('/posts/store', savePostController)


// app.get('/posts/new', (req, res) => {
//   // res.sendFile(path.resolve(__dirname,'public/post.html'))
//   res.render('create')
//  }) refac
app.get('/posts/new',newPostController)

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





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})