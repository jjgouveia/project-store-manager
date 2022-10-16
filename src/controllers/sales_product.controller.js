const { salesProductsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createNewSale = async (req, res) => {
  const saleInfo = req.body;
  const { type, message } = await salesProductsService.createNewSale(saleInfo);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const removeSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesProductsService.removeSale(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const saleInfo = req.body;

  const { type, message } = await salesProductsService.updateSale(id, saleInfo);

  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createNewSale,
  removeSale,
  updateSale,
};