const { salesModel } = require('../models');
const { validateId } = require('./validations/validateInputs');

const getAllProducts = async () => {
  const result = await salesModel.listAll();

  if (!result.length) return { type: null, message: 'There\'s no sales yet' };

  return { type: null, message: result };
};

const getProductsById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const result = await salesModel.listById(id);

  if (!result.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getProductsById,
};