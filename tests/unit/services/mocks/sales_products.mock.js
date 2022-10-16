
const invalidSaleRequest = [
  { productId: 99, quantity: 2022 },
];

const requestWithoutProductId = [
  { quantity: 2022 },
];

const requestWithoutQuantity= [
  { productId: 22 },
];

module.exports = {
  invalidSaleRequest,
  requestWithoutProductId,
  requestWithoutQuantity
}