const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../api/app');
const { Products } = require('../../database/models');
const allProductsMock = require('../../../../front-end/src/tests/mocks/allProductsMock');
const { expect } = chai;
chai.use(chaiHttp);

const HTTP_OK_STATUS = 200;

describe('Test the "/products" route', function () {
  let chaiHttpResponse;
  afterEach(function () {
    sinon.restore();
  });
  it('Test if it is possible to fetch all products successfully', async function () {
    sinon.stub(Products, 'findAll').resolves(allProductsMock);
    chaiHttpResponse = await chai.request(app).get('/products');
    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(allProductsMock);
  });
});