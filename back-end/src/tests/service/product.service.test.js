const { expect } = require('chai');
const sinon = require('sinon');
const allProductsMock = require('../../../../front-end/src/tests/mocks/allProductsMock');

const { Products } = require('../../database/models');

const productService = require('../../service/products.service');

describe('Test the product service', () => {
    afterEach(function () {
      sinon.restore();
    });

    it('Test whether it returns all products', async function () {
      sinon
        .stub(Products, 'findAll')
        .resolves(allProductsMock);

        const response = await productService.getAllProducts();

      expect(response).to.be.equal(allProductsMock);
    });
  });
