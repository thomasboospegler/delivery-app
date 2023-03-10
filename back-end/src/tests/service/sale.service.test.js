const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../database/models');

const salesService = require('../../service/sales.service');
// const salesService = require('../../service/sales.service');

// const emailValid = 'zebirita@email.com';
const mockUser = {
    name: 'Teste Teste Teste',
    email: 'test@test.com',
    password: '123456789',
  }

  const mockCreateSale = 
  

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

    // it('Test whether it returns an user by email', async function () {
    //     sinon
    //       .stub(Sales, 'create')
    //       .resolves(mockCreateSale);
  
    //       const response = await salesService.createSale(mockCreateSale);
  
    //     expect(response).to.be.equal();
    //   });
  });
