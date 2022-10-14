const { expect } = require("chai");
const Sinon = require("sinon");
const { productModel } = require("../../../src/models");
const { salesProductsService, salesService } = require("../../../src/services");
const { invalidSaleRequest, requestWithoutProductId, requestWithoutQuantity } = require("./mocks/sales_products.mock");

describe("Testes de unidade da camada sales_products", function () {
  describe("Criação de uma venda", function () {
    it("Falha se o id for inválido", async function () {
      Sinon.stub(productModel, 'listById').resolves(undefined);

      const result = await salesProductsService.createNewSale(invalidSaleRequest);
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("Falha se o id não for informado na requisição", async function () {
      Sinon.stub(salesService, 'getSalesById').resolves(undefined);

      const result = await salesProductsService.createNewSale(requestWithoutProductId);
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"productId" is required');
    });

    it("Falha se a quantidade não for informada na requisição", async function () {
      const result = await salesProductsService.createNewSale(requestWithoutQuantity)
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"quantity" is required');
    });
  });
});