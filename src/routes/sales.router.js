const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.get('/', saleController.getAllProducts);

router.get('/:id', saleController.getProductsById);

router.post('/', (_req, res) => {
  res.status(201).end();
});

module.exports = router;