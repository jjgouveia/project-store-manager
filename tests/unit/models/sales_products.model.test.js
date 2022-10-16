const { expect } = require("chai");
const Sinon = require("sinon");
const { salesProductModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { newSaleRequest, allSalesFromDB, saleToUpdate } = require("./mocks/sales_products.model.mock");

describe('Teste as implementações da camada Sales_Products - Model', () => {
  describe('Escrita', () => {
    afterEach(() => Sinon.restore());
    it('Verifica se é possível adicionar uma nova venda à tabela "sales', async () => {
      Sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesProductModel.insert(newSaleRequest);
      expect(result).to.equal(1);
    });
    it('Verifica se é possível deletar uma venda', async () => {
      Sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesProductModel.removeSaleProduct(allSalesFromDB[0].saleId);
      expect(result).to.deep.equal([{ affectedRows: 1 }]);
    });
    afterEach(() => Sinon.restore());
    it('Atualiza uma venda', async () => {
      Sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
      const result = await salesProductModel.update(1, saleToUpdate);
      expect(result).to.deep.equal({ affectedRows: 1 });
    });
  });
});