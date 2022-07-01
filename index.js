const express = require('express')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const validateMiddleWare = require('./middlewares/validationMidddleware')
const authMid=require('./middlewares/authMiddleware')
const expressSessions = require('express-session')


  // from cont
  const newPostController = require('./controllers/newPost')
  const aboutController = require('./controllers/aboutPage')
  const contactController =  require('./controllers/contactPage')
  const savePostController = require('./controllers/storePosts')
  const getPostController = require('./controllers/getSinglePost')
  const signInController = require('./controllers/signIn')
  const signUpController = require('./controllers/signUp')
  const singnOutController =require('./controllers/signOut')
  const registerUserController =  require('./controllers/registerUser')
  const loginUserController = require('./controllers/signInUser')
  const redirectLoggedIn = require('./middlewares/redirectIfAuthenticatedMiddleware')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
const signOut = require('./controllers/signOut')

mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true})


const app = express()
const port = 3000
global.isLoggedIn=null;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(fileUpload())
app.use('/posts/store',validateMiddleWare)
app.use(expressSessions({
  secret:"siri",
  resave:true,
  saveUninitialized:true
}))
app.use("*",(req,res,next)=>{
  isLoggedIn=req.session.userId;

  next();
});



app.get('/', async(req, res) => {
  const blogposts = await BlogPost.find()
  console.log(req.session)
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
app.post('/posts/store',authMid, savePostController)
app.get('/auth/signIn',redirectLoggedIn,signInController)
app.get('/auth/signUp',redirectLoggedIn,signUpController)
app.post('/users/register',redirectLoggedIn,registerUserController)
app.post('/users/login',redirectLoggedIn,loginUserController)
app.get('/auth/signOut',signOut)
app.use((req,res)=>{
  res.render('404')
})



// app.get('/posts/new', (req, res) => {
//   // res.sendFile(path.resolve(__dirname,'public/post.html'))
//   res.render('create')
//  }) refac
app.get('/posts/new',authMid,newPostController)

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