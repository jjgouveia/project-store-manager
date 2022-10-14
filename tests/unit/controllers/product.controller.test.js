const Sinon = require("sinon");
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productController } = require("../../../src/controllers");
const { productService } = require("../../../src/services");
const { listControllerMock, resultInsert, resultDelete } = require("./mocks/product.controller.mock");

const { expect } = require('chai');
chai.use(sinonChai);

describe('Teste de unidade no productController', () => {
  beforeEach(() => Sinon.restore());
  it('Recuperando a lista de produtos', async () => {
    const req = {};
    const res = {};

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    Sinon
      .stub(productService, 'getAllProducts')
      .resolves({ type: null, message: listControllerMock });

    await productController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listControllerMock);
  });
  it('Recupera o produto através do ID', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    }

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    await productController.getProductsById(req, res);

    Sinon
      .stub(productService, 'getProductsById')
      .resolves({ type: null, message: listControllerMock[0] })
    expect(res.status).to.have.been.calledWith();
  });
  it('Inserindo um novo produto', async () => {
    const res = {}
    const req = {
      body: { name: "Olho de Agamotto" },
    }
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    await productController.requestNewProduct(req, res);

    Sinon
      .stub(productService, 'createProduct')
      .resolves({ type: null, message: resultInsert });
    
    expect(res.status).to.have.been.calledWith(201);
  });
  it("Deleta um produto do banco de dados", async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = Sinon.stub().returns(res);
    res.end = Sinon.stub().returns();
    Sinon.stub(productService, 'deleteProduct').resolves({ type: null });

    await productController.requestDelete(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });
});
