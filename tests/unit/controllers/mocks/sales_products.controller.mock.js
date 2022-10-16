const editedSaleResponse = {
  "id": 1,
  "itemsSold": [
    {
      "productId": 8,
      "quantity": 256
    }
  ]
};

const saleToUpdateWithNoPID = {
  quantity: 256
};

const saleToUpdateWithNoQtd = {
  productId: 8
};

const saleToUpdateWithZeroQtd = {
  productId: 8,
  quantity: 0
};


module.exports = {
  editedSaleResponse,
  saleToUpdateWithNoPID,
  saleToUpdateWithNoQtd,
  saleToUpdateWithZeroQtd,
}