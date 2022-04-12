
const express = require('express');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override')
const path = require('path')

const ProductRouter = require('./routes/ProductRouter');
const passport =require('passport');
const { loginCheck} = require('./auth/passport');
loginCheck(passport)

const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://Netflix:Netflix@cluster0.7n1lg.mongodb.net/Bakery?retryWrites=true&w=majority'
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))


// register view engine
app.set('view engine', 'ejs')
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());
  

app.use(session({
  secret:'oneboy',
  saveUninitialized: true,
  resave: true
}));
app.use(methodOverride('_method'))
app.use(passport.initialize());
app.use(passport.session())
//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


app.use('/', require('./routes/login'))
app.use('/', ProductRouter)



app.listen(3000);