const salesService = require('./sales.service');
const { productModel, salesProductModel, salesModel } = require('../models');
const { validateId, ensureValidateSale } = require('./validations/validateInputs');
const saleModelMaks = require('../helpers/createSale');
const updateModelMask = require('../helpers/updateSale');

const validateProductId = async (ids) => {
  const productsList = await productModel.listAll();
  const productIds = productsList.map(({ id }) => id);
  const queryToSaleId = ids.map(({ productId }) => productId);
  if (queryToSaleId.every((id) => productIds.includes(id))) return true;
  return false;
};

const validateSale = (saleInfo) => {
  const validation = saleInfo.map((sale) => ensureValidateSale(sale));
  const error = validation.find(({ type }) => type);
  if (error) return error;
  return { type: null, message: '' };
};

const createNewSale = async (saleInfo) => {
  const error = validateSale(saleInfo);
  if (error.type) return error;

  const productExists = await validateProductId(saleInfo);

  if (productExists) {
    const saleId = await salesService.newSale();
    const createAllSales = saleInfo.map(async (sale) => {
    await salesProductModel.insert({ saleId, ...sale });
    });

    await Promise.all(createAllSales);
    const sale = saleModelMaks(saleId, saleInfo);
    return { type: null, message: sale };
  }

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const updateSale = async (saleId, saleToEdit) => {
  const error = validateSale(saleToEdit);
  if (error.type) return error;

  const productExists = await validateProductId(saleToEdit);
  const saleExists = await productModel.listById(saleId);
  if (!saleExists) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  if (saleExists && productExists) {
    const salesUpdated = saleToEdit.map(async (sale) => {
     await salesProductModel.update(saleId, sale);
    });
    
    await Promise.all(salesUpdated);
    const result = await updateModelMask(saleId, saleToEdit);
    return { type: null, message: result };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const removeSale = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const validateIfIdExists = await salesModel.listById(id);

  if (!validateIfIdExists || !validateIfIdExists.length) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  await salesModel.removeSaleRegistry(id);
  await salesProductModel.removeSaleProduct(id);

  return { type: null };
};

module.exports = {
  createNewSale,
  removeSale,
  updateSale,
};