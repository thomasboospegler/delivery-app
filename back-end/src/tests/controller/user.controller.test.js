const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const userController = require('../../controller/user.controller');
const userService = require('../../service/user.service');

describe('Test the user controller', () => {
  describe('Test the Login router', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Test with not existed user', async function () {
      const res = {};
      const req = {
        body: {
          email: 'test@test.com',
          password: '123456',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(userService, 'getUserByEmail')
      .resolves(null);

      await userController.login(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('Test with existed user', async function () {
      const res = {};
      const req = {
        body: {
          email: 'test@test.com',
          password: '123456789',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(userService, 'getUserByEmail')
        .resolves({ password: '25f9e794323b453885f5181f1b624d0b' });

      await userController.login(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

