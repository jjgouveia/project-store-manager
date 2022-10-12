const { expect } = require("chai");
const Sinon = require("sinon");
const { productModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { productsFromDB, productsList, newProduct } = require("./mocks/product.model.mock");

describe('Testa as implementações da camada Model', () => {
  describe('Manipulação no banco de dados', () => {
    afterEach(() => Sinon.restore());
    it('Resgata a lista completa de produtos', async () => {
      Sinon.stub(connection, 'execute').resolves([productsFromDB]);
      const request = await productModel.listAll();
      expect(request).to.be.deep.equal(productsList);
    });
    it('Verifica se é possível localizar um carro através do ID', async function () {
      Sinon.stub(connection, 'execute').resolves([[productsFromDB[2]]]);
      const request = await productModel.listById(3);
      expect(request).to.be.deep.equal(productsList[2]);
    });
  });

  describe('Verifica a inserção de um item no banco de dados', () => {
    afterEach(() => Sinon.restore());
    it('Insere um produto', async () => {
      Sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const request = await productModel.insert(newProduct);
      expect(request).to.equal(1);
    });
  });
});