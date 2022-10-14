const { expect } = require("chai");
const Sinon = require("sinon");
const { productModel } = require("../../../src/models");
const { productService } = require("../../../src/services");
const { productsFromDB, productsList, productToUpdate, invalidProductIdEdit, queryExpected } = require("../models/mocks/product.model.mock");
const { newItem, validReq, invalidReq } = require("./mocks/products.services.mock");

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
      Sinon.stub(productModel, 'listAll').resolves(productsFromDB[1]);
      const products = await productService.getProductsById(2);
      // expect(products.message).to.deep.equal(productsList[1]);
    });
  });
  describe('Inserção e validação das informações', () => {
    afterEach(() => Sinon.restore());
    it('Não retorna erro na requisição', async () => {
      Sinon.stub(productModel, 'insert').resolves(newItem);
      const response = await productService.createProduct(validReq)
      expect(response.type).to.equal(null);
    });
    it('Retorna erro na requisição', async () => {
      Sinon.stub(productModel, 'insert').resolves(newItem);
      const response = await productService.createProduct(invalidReq)
      expect(response.type).to.equal('INVALID_NAME');
    });
  });
  describe('Deleção e validação das informações', () => {
    afterEach(() => Sinon.restore());
    it('Não retorna erro na requisição', async () => {
      Sinon.stub(productModel, 'deleteProduct').resolves({ affectedRows: 1 });
      Sinon.stub(productModel, 'listById').resolves(productsFromDB[0]);

      const response = await productService.deleteProduct(productsFromDB[0].id)
      expect(response.type).to.equal(null);
    });

    it('Retorna erro na requisição', async () => {
      Sinon.stub(productModel, 'deleteProduct').resolves(productsFromDB[0].id);
      
      const response = await productService.deleteProduct(invalidReq)
      expect(response.type).to.equal('INVALID_VALUE');
    });
  });
  describe('Atualização e validação das informações', () => {
    afterEach(() => Sinon.restore());
    it('Requisição bem sucedida', async () => {
      Sinon.stub(productModel, 'update').resolves({ affectedRows: 1 });
      Sinon.stub(productModel, 'listById').resolves(productsFromDB[0]);

      const response = await productService.updateProduct(productToUpdate);
      expect(response.type).to.equal(null);
      expect(response.message).to.equal(productToUpdate);
    });
    it('Retorna erro na requisição', async () => {
      Sinon.stub(productModel, 'update').resolves(undefined);
      Sinon.stub(productModel, 'listById').resolves(undefined);

      const response = await productService.updateProduct(invalidProductIdEdit);
      expect(response.type).to.be.not.undefined;
      expect(response.message).to.equal('Product not found');
    });
  });
  describe('Verifica se é possível fazer uma requisição através do nome do produto', () => {
    afterEach(() => Sinon.restore());
    it('Busca pelo Capitão América', async () => {
      Sinon.stub(productModel, 'findByQuery').resolves(queryExpected);

      const response = await productService.queryProduct("%Cap");
      expect(response.type).to.equal(null);
      expect(response.message).to.equal(queryExpected);
    });
    it('Se resgata a lista completa se a query for vazia', async () => {
      Sinon.stub(productModel, 'findByQuery').resolves(productsFromDB);

      const response = await productService.queryProduct();
      expect(response.type).to.equal(null);
      expect(response.message).to.equal(productsFromDB);
    });
  });
});