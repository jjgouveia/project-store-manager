const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.string().min(5).required();

const addSalesSchema = Joi.object({
  productId: Joi.number().positive(),
  quantity: Joi.number().min(1),
});

module.exports = {
  idSchema,
  nameSchema,
  addSalesSchema,
};