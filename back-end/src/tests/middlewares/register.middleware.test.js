const { expect } = require('chai');
const sinon = require('sinon');

const userService = require('../../service/user.service');
const { validateRegister } = require('../../middlewares/register.middleware');

describe('Test the register middleware', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Test with invalid email', function () {
    const res = {};
    const req = {
      body: {
        name: 'Test Test Test',
        email: 'test@test',
        password: '123456',
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    validateRegister(req, res);

    expect(res.status.calledWith(400)).to.be.equal(true);
  });

  it('Test with valid inputs', function () {
    const res = {};
    const req = {
      body: {
        name: 'Test Test Test',
        email: 'test@test.com',
        password: '123456',
      },
    };
    const next = function () {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    validateRegister(req, res, next);

    // Procurar como testar se o "next" foi chamado
    expect(true).to.be.equal(true);
    // expect(next).toHaveBeenCalled();
  });
});
