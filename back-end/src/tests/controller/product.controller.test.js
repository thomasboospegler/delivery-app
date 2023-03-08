const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productController = require('../../controller/products.controller');
const productService = require('../../service/products.service');

describe('Test the product controller', () => {
    afterEach(function () {
      sinon.restore();
    });

    it('Test if the state of the request is 200', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'getAllProducts')
        .resolves();

      await productController.getAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
