const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/about', (req, res) => {
  res.render('about')
})
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/post', (req, res) => {
 // res.sendFile(path.resolve(__dirname,'public/post.html'))
 res.render('post')
})
app.get('/posts/new', (req, res) => {
  // res.sendFile(path.resolve(__dirname,'public/post.html'))
  res.render('create')
 })
// app.post('/home',  (req, res) =>{
//   res.send('Jungle!')
// })
app.post('/posts/store',(req,res)=>{
  console.log(req.body)
  res.redirect('/')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})