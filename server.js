const express = require('express');
const app = express();
const passport =require('passport');
const { loginCheck} = require('./auth/passport');
loginCheck(passport)
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const BlogRouter = require('./routes/BlogRouter');
const cookieParser = require('cookie-parser');
const fs = require('fs')

const mongoose = require('mongoose');

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))


// register view engine
app.set('view engine', 'ejs')
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());
app.use(session({secret: '{secret}', name: 'session_id', saveUninitialized: true, resave: true}));
//middlewares
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser('secret'))
app.use(session({cookie: {maxAge: null}}))

//flash message middleware
app.use((req, res, next)=>{
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

app.use(methodOverride('_method'))
app.use(passport.initialize());
app.use(passport.session())
//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


app.use('/', require('./routes/login'))
app.use('/', BlogRouter)



app.listen(3000);