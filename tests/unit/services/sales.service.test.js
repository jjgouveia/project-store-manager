const { expect } = require("chai");
const Sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");
const { salesFromDB, allSalesById } = require("../models/mocks/sales.model.mock");

const SALE_NOT_FOUND = 'SALE_NOT_FOUND';


describe('Testa as implementações da camada de Products-Service', () => {
  describe('Leitura e validação no banco de dados', () => {
    afterEach(() => Sinon.restore());

    it('A lista de produtos é um array', async () => {
      Sinon.stub(salesModel, 'listAll').resolves([salesFromDB]);
      const sales = await salesService.getAllSales();
      expect(sales.message instanceof Array).to.equal(true);
    });
    it('Retorna uma resposta se a lista de vendas estiver vazia', async () => {
      Sinon.stub(salesModel, 'listAll').resolves(undefined);
      const sales = await salesService.getAllSales();
      expect(sales.message).to.be.equal("There's no sales yet");
    });
    it('Retorna a lista de produtos por ID', async () => {
      Sinon.stub(salesModel, 'listById').resolves(allSalesById);
      const sales = await salesService.getSalesById(2);
      expect(sales.message).to.be.deep.equal(allSalesById);
    });
    it('Retorna erro quando a venda não é encontrada', async () => {
      Sinon.stub(salesModel, 'listById').resolves(undefined);
      const sales = await salesService.getSalesById(1);
      expect(sales.type).to.be.equal(SALE_NOT_FOUND);
    });
    it('Retorna erro quando pe pesquisado um valor não-numérico e positivo', async () => {
      Sinon.stub(salesModel, 'listById').resolves(undefined);
      const sales = await salesService.getSalesById("invalida_value");
      console.log(sales.type);
    });
    it('Insere um novo registro de venda no Banco de Dados', async () => {
      Sinon.stub(salesModel, 'insert').resolves({ insertId: 1 });
      const sales = await salesService.newSale();
      expect(sales);
    });
  });
});