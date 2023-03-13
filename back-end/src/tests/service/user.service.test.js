const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiAsPromise = require('chai-as-promised');

chai.use(chaiAsPromise);

const { User } = require('../../database/models');
const userService = require('../../service/user.service');

const sellerMock = [
  {
    "name": "Fulana Pereira"
  }
]

describe('Test the user service', function () {
  describe('Test getUserByEmail function', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Test with not existed user', async function () {
      sinon.stub(User, 'findOne').resolves(null);

      const response = await userService.getUserByEmail({
        email: 'test@test.com',
      });

      expect(response).to.deep.equal(null);
    });
  });

  describe('Test createUser function', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Test with already existed user', async function () {
      sinon.stub(User, 'findOne').resolves({
        name: 'Teste Teste Teste',
        email: 'test@test.com',
        password: '123456789',
      });

      const response = await userService.createUser({
        name: 'Teste Teste Teste',
        email: 'test@test.com',
        password: '123456789',
      });

      expect(response).to.deep.equal(null);
    });

    it('Test with not existed user', async function () {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves({});

      const response = await userService.createUser({
        name: 'Teste Teste Teste',
        email: 'test@test.com',
        password: '123456789',
      });

      expect(response).to.deep.equal({});
    });

    it('Test if every seller is returned', async function () {
      sinon
        .stub(User, 'findAll')
        .resolves(sellerMock);

        const response = await userService.getSellers();

      expect(response).to.be.equal(sellerMock);
    });


    it('Test the error case in seller', async function () {
      sinon
        .stub(User, 'findAll')
        .throws(new Error('deu erro'))

      const promise = userService.getSellers();
      await expect(promise).to.be.rejectedWith('deu erro')
    });
  });
});
