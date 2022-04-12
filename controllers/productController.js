const Product = require('../models/product')
const bodyParser = require('body-parser')

  
const product_base = (req, res) => {
    res.render('products/base');
}

const product_index = (req, res) => {
    Product.find()
    .then((result) => {
        res.render('products/index', { products: result });
    })
    .catch((err) => {
        console.log(err)
    })
};

const product_create_get = (req, res) => {
    res.render('products/create');
}

const product_create_post = (req, res) => {
    const product = new Product(req.body);
    
    product.save()
        .then((result) => {
            res.redirect('/products');
        })
        .catch((err) => {
            console.log(err);
        });
}
const product_details = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .then(result => {
            res.render('products/details', { product: result });
        })
        .catch(err => {
            console.log(err)
        })
};
const product_edit = (req, res) => {
    let product
    try {
    product = Product.findById(req.params.id)
    product.title = req.body.title
    product.description = req.body.description
    product.save()
    res.redirect(`/products`)
  } catch {
    if (product == null) {
      res.redirect('/')
    } else {
      res.render('products/edit', {
        product: product,
        errorMessage: 'Error updating Product'
      })
    }
  }

}
const product_delete = (req,res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
    .then(result => {
        res.redirect('/products')
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = {
    product_base,
    product_index,
    product_details,
    product_create_get,
    product_create_post,
    product_delete,
    product_edit,
}