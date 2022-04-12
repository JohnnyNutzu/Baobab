const express = require('express');
const productController = require('../controllers/productController')
const router = express.Router();

router.get('/', productController.product_base);
router.get('/products', productController.product_index);
router.post('/products', productController.product_create_post);
router.get('/create', productController.product_create_get);
router.get('/products/:id', productController.product_details);
router.put('/products/:id/edit', productController.product_edit);
router.delete('/products/:id', productController.product_delete);
  


module.exports = router;