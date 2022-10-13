const express = require('express');
const { saleController, saleProductController } = require('../controllers');

const router = express.Router();

router.get('/', saleController.allSales);

router.get('/:id', saleController.salesById);

router.post('/', saleProductController.createNewSale);

module.exports = router;