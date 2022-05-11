const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/blog_db',{useNewUrlParser:true});


BlogPost.create({
    title:'Premier League 2021/22 season ends',
    body:'As we near final match day 38, we are getting closer to the summer break and also unfortunately the premier leagues final match. Some teams have really improved this season and some have made record lows ie Manchester United ,while their neighbours Manchester City still have one arm on the Legue Title. '
},(error,blogpost)=>{
    console.log(error,blogpost)
})