const { expect } = require("chai");
const Sinon = require("sinon");
const { productModel } = require("../../../src/models");
const { productService } = require("../../../src/services");
const { productsFromDB, productsList } = require("../models/mocks/product.model.mock");

describe('Testa as implementações da camada de Products-Service', () => {
  describe('Leitura e validação no banco de dados', () => {
    beforeEach(() => {
      Sinon.stub(productModel, 'listAll').resolves([productsFromDB]);
    })
    afterEach(() => Sinon.restore());

    it('A lista de produtos é um array', async () => {
      const products = await productService.getAllProducts();
      expect(products.message instanceof Array).to.equal(true);
    });
    it('Retorna a lista de produtos com', async () => {
      const products = await productService.getAllProducts();
      expect(products.message).to.deep.equal([productsList]);
    });
  });
  describe('Leitura específica no banco de dados', () => {
    afterEach(() => Sinon.restore());
    it('A lista de produtos é um array', async () => {
      Sinon.stub(productModel, 'listAll').resolves([productsFromDB[1]]);
      const products = await productService.getProductsById(2);
      expect(products.message).to.deep.equal(productsList[1]);
    });
  });
});