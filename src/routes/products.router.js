const express = require('express');
const { productController } = require('../controllers');
const ensureName = require('../middlewares/ensureName');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/search', productController.findProductByName);

router.get('/:id', productController.getProductsById);

router.post('/', ensureName, productController.requestNewProduct);

router.put('/:id', ensureName, productController.editProduct);

router.delete('/:id', productController.requestDelete);

module.exports = router;
