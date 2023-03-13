const { expect } = require('chai');
const sinon = require('sinon');

const { User, Sales, SalesProducts } = require('../../database/models');

const salesService = require('../../service/sales.service');
// const salesService = require('../../service/sales.service');

// const emailValid = 'zebirita@email.com';
const mockUser = {
    name: 'Teste Teste Teste',
    email: 'test@test.com',
    password: '123456789',
  }

  const mockCreateSale = {
    userEmail: 'zebirita@email.com',
    sellerName: 'Fulana Pereira',
    totalPrice: '4.40',
    deliveryAddress: 'Rua da Trybe',
    deliveryNumber: '12',
    productsId: [1],
    quantity: 2,
  };
  
  const mockZeBirita = {
    email: 'zebirita@email.com',
    name: 'Cliente Zé Birita',
    role: 'customer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2Nzg0ODUwODEsImV4cCI6MTY3ODU3MTQ4MX0._s1K_t26exwbZni_Ekhkz7w_rEiEYlPCjgBSu7aJ7AM',
  };

  const mockNewSale = {
    id: 1,
    userId: 1,
    sellerId: 2,
    totalPrice: '10.00',
    deliveryAddress: 'Rua da Trybe',
    deliveryNumber: '12',
    salesDate: Date.now(),
    status: 'pendente',
  };
  
  const mockFailSale = {
    id: null,
    userId: 0,
    sellerId: 0,
    totalPrice: '10.00',
    deliveryAddress: 'Rua da Trybe',
    deliveryNumber: '12',
    salesDate: Date.now(),
    status: 'pendente',
  };

  const mockSaleProduct = {
    saleId: 1,
    productId: 1,
    quantity: 2,
  };

  const failingMockSaleProduct = {
    saleId: 1,
    productId: 1,
  };

describe('Test the sale service', () => {
    afterEach(function () {
      sinon.restore();
    });

    it('Test whether it returns an user by email', async function () {
      sinon
        .stub(User, 'findOne')
        .resolves(mockUser);

        const response = await salesService.getUserByEmail(mockUser.email);

      expect(response).to.be.equal(mockUser);
    });

    it('can create a sale', async function () {

        const userStub = sinon.stub(User, 'findOne');
        const salesStub = sinon.stub(Sales, 'create');

        userStub.onCall(0).resolves({ id: 1 });
        userStub.onCall(1).resolves({ id: 2 });
        salesStub.onCall(0).resolves(mockNewSale);

        const response = await salesService.createSale(mockCreateSale);
      
      expect(response).to.be.equal(mockNewSale.id);
      });
  });
