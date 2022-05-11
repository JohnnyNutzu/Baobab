const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Blog= require("../models/blog");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.get('/', (req, res) => {
    Blog.find()
    .then((result) => {
        res.render('blogs/index', { blogs: result });
    })
    .catch((err) => {
        console.log(err)
    })
});

router.get('/create',(req, res)=> {
    res.render('blogs/create');
} );

router.post("/", upload.single('img'), (req, res, next) => {
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      img: req.file.filename,
    });
    blog.save()
    .then((result) => {
        req.session.message = {
            type: 'success',
            intro: 'Blog added! ',
            message: 'Thank you.'
          }
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
    });
      
  });

  router.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { blog: result });
        })
        .catch(err => {
            console.log(err)
        })
  });


  router.put('/blogs/:id/edit', (req,res)=> {
    let blog
    try {
    blog = Blog.findById(req.params.id)
    blog.title = req.body.title
    blog.description = req.body.description
    blog.save()
    res.redirect(`/blogs`)
  } catch {
    if (blog == null) {
      res.redirect('/')
    } else {
      res.render('blogs/edit', {
        blog: blog,
        errorMessage: 'Error updating Blog'
      })
    }
  }
  });
  router.delete('/blogs/:id', (req, res)=> {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        req.session.message = {
            type: 'danger',
            intro: 'Blog deleted!',
            message: 'Ooops.'
          }
        res.redirect('/')
    })
    .catch((err) => {
        console.log(err);
    })
  });

module.exports = router;