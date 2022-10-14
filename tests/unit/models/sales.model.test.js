const { expect } = require("chai");
const Sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { insertSalesModelMock, expetedResponse, salesFromDB, allSalesById, ResponseAllSalesById } = require("./mocks/sales.model.mock");

describe('Teste as implementações da camada Sales - Model', () => {
  describe('Escrita', () => {
    afterEach(() => Sinon.restore());
    it('Verifica se é possível adicionar uma nova venda à tabela "sales', async () => {
      Sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesModel.insert(insertSalesModelMock);
      expect(result).to.equal(1);
    })
    it('Verifica se é possível retornar a lista completa de vendas', async () => {
      Sinon.stub(connection, 'execute').resolves([salesFromDB]);
      const result = await salesModel.listAll();
      expect(result).to.be.deep.equal(expetedResponse);
    });
    it('Verifica se é possível retornar uam venda específica pelo ID', async () => {
      Sinon.stub(connection, 'execute').resolves([[allSalesById[0]]]);
      const result = await salesModel.listById(1);
      expect(result).to.be.deep.equal(ResponseAllSalesById);
    });
  });
  });
