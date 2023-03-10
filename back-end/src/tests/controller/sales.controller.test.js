const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesController = require('../../controller/sales.controller');
const salesService = require('../../service/sales.service');

const mockReq = {
  "userEmail": "zebirita@email.com",
  "sellerName": "Fulana Pereira",
  "totalPrice": "4.40",
  "deliveryAddress": "Rua da Trybe",
  "deliveryNumber": "12",
  "productsId": "1",
  "quantity": "2"
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2Nzg0NzM0NzUsImV4cCI6MTY3ODU1OTg3NX0.ffegiY93Nqd2iQEElUnYJFxHtf3aLjcsdLj_OBPzvuw'

describe('Test the sales controller', () => {
    afterEach(function () {
      sinon.restore();
    });

    it('Test if the state of the request is 400', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'createSale')
        .resolves();

      await salesController.createSales(req, res);
      expect(res.status.calledWith(400)).to.be.equal(true);
    });
    it('Test if the state of the request is 201', async function () {
      const res = {};
      const req = { body: mockReq, header: { Authorization: token } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'createSale')
        .resolves({ insertId: 0 });

      await salesController.createSales(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
    it('Test if the state of the request is 500', async function () {
      const res = {};
      const req = { body: {}, header: { Authorization: token } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'createSale')
        .throwsException()

      await salesController.createSales(req, res);
      expect(res.status.calledWith(500)).to.be.equal(true);
    });
  });
