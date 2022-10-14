const chai = require('chai');
const { expect } = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController, productController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { allSalesById } = require('../models/mocks/sales.model.mock');
const { controllerListMock } = require('./mocks/sales.controller.mock');
chai.use(sinonChai);

describe('Teste de unidade em saleController', () => {
  beforeEach(() => Sinon.restore());
  it('Recuperando a lista de produtos', async () => {
    const req = {};
    const res = {};

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    Sinon
      .stub(salesService, 'getAllSales')
      .resolves({ type: null, message: controllerListMock });

    await saleController.allSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerListMock);
  });
  it('Recupera o produto através do ID', async () => {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();
    Sinon
      .stub(salesService, 'getSalesById')
      .resolves({ type: null, message: allSalesById });

    await saleController.salesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesById);
  });
  });
  it('Verifica o retorno de uma requisição inválida', async () => {
    const res = {};
    const req = {
      params: { id: "valor inválido" },
    }

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    await saleController.salesById(req, res);

    Sinon
      .stub(salesService, 'getSalesById')
      .resolves({ type: null, message: controllerListMock[0] });

    expect(res.status).to.have.been.calledWith(422);
  });
