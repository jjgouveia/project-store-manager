const { expect } = require("chai");
const Sinon = require("sinon");
const { productModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { productsFromDB, productsList, newProduct, productToUpdate, queryExpected } = require("./mocks/product.model.mock");

describe('Testa as implementações da camada Model', () => {
  describe('Manipulação no banco de dados', () => {
    afterEach(() => Sinon.restore());
    it('Resgata a lista completa de produtos', async () => {
      Sinon.stub(connection, 'execute').resolves([productsFromDB]);
      const request = await productModel.listAll();
      expect(request).to.be.deep.equal(productsList);
    });
    it('Verifica se é possível localizar um produto através do ID', async function () {
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
  describe('Verifica a deleção um item do banco de dados', () => {
    afterEach(() => Sinon.restore());
    it('Deleta um produto', async () => {
      Sinon.stub(connection, "execute").resolves({ affectedRows: 1 });

      const result = await productModel.deleteProduct(productsFromDB[0].id);
      expect(result).to.deep.equal({ affectedRows: 1 });
    });
  });
  describe('Verifica a atualização de um produto no banco de dados', () => {
    afterEach(() => Sinon.restore());
    it('Atualiza um produto', async () => {
      Sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
      const result = await productModel.update(productToUpdate);
      expect(result).to.deep.equal({ affectedRows: 1 });
    });
  });
  describe('Verifica é possível encontrar um produto pelo nome', () => {
    afterEach(() => Sinon.restore());
    it('Se encontra o "Capitão América"', async () => {
      Sinon.stub(connection, "execute").resolves([queryExpected]);
      const result = await productModel.findByQuery('%Cap%');
      expect(result).to.be.deep.equal(queryExpected);
    });
  });
});