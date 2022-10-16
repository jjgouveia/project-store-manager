const newSaleRequest = [
  { productId: 3, quantity: 2 },
  { productId: 1, quantity: 1 },
];

const allSalesFromDB = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 2,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const saleToUpdate = {
  productId: 8,
  quantity: 256
};


module.exports = {
  newSaleRequest,
  allSalesFromDB,
  saleToUpdate,
}