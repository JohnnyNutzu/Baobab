require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const dbUri = 'mongodb+srv://Netflix:Netflix@cluster0.7n1lg.mongodb.net/Bakery?retryWrites=true&w=majority'
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))


// register view engine
app.set('view_engine', 'ejs')

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/index'));

//trying
app.get('/add-product', (req, res) => {
    const product = new Product({
        title: 'new product',
        description: 'Very nice description',
    });
    product.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        })
});