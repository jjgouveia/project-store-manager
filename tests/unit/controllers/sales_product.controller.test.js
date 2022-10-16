const { expect } = require("chai");
const chai = require("chai");
const Sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { saleProductController } = require("../../../src/controllers");
const { salesProductsService } = require("../../../src/services");
chai.use(sinonChai);

const { saleToUpdate } = require("../models/mocks/sales_products.model.mock");
const { editedSaleResponse, saleToUpdateWithNoPID, saleToUpdateWithNoQtd, saleToUpdateWithZeroQtd } = require("./mocks/sales_products.controller.mock");

describe('Teste de unidade da camada sales_products.controller', () => {
  describe('Update', () => {
    beforeEach(() => {
      Sinon.restore()
    });
    it('Verifica a requisição de atualização de uma venda', async () => {
      const req = {
        params: { id: 1 },
        body: { ...saleToUpdate }
      };
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      Sinon
        .stub(salesProductsService, 'updateSale')
        .resolves({ type: null, message: editedSaleResponse })

      await saleProductController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(editedSaleResponse);
    });
    it('Rejeita a requisição sem o campo de "id" do produto', async () => {
      const req = {
        params: { id: 1 },
        body: { ...saleToUpdateWithNoPID }
      };
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      Sinon
        .stub(salesProductsService, 'updateSale')
        .resolves({ type: 'MISSING_FIELD', message: "\"productId\" is required" })

      await saleProductController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: "\"productId\" is required" });
    });
    it('Rejeita a requisição sem o campo de "quantidade" do produto', async () => {
      const req = {
        params: { id: 1 },
        body: { ...saleToUpdateWithNoQtd }
      };
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      Sinon
        .stub(salesProductsService, 'updateSale')
        .resolves({ type: 'MISSING_FIELD', message: "\"quantity\" is required" })

      await saleProductController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: "\"quantity\" is required" });
    });
    it('Rejeita a requisição se o campo "quantidade" for menor que "1"', async () => {
      const req = {
        params: { id: 1 },
        body: { ...saleToUpdateWithZeroQtd }
      };
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      Sinon
        .stub(salesProductsService, 'updateSale')
        .resolves({ type: 'INVALID_VALUE', message: "\"quantity\" must be greater than or equal to 1" })

      await saleProductController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  });
  describe('Delete', () => {
    beforeEach(() => {
      Sinon.restore()
    });
    it('Requisita com sucesso a remoção de uma venda', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.end = Sinon.stub().returns();
      
      Sinon
        .stub(salesProductsService, 'removeSale')
        .resolves({ type: null });
      
      await saleProductController.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
    it('Rejeita a remoção de uma venda caso o "id" seja inválido', async () => {
      const req = {
        params: { id: 'a' },
      };
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      Sinon
        .stub(salesProductsService, 'removeSale')
        .resolves({ type: 'INVALID_VALUE', message: "\"id\" must be a number" });

      await saleProductController.removeSale(req, res);
      expect(res.status).to.have.been.calledWith(422);
    });
  });
});

