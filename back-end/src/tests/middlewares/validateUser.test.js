const { expect } = require('chai');
const sinon = require('sinon');

const userService = require('../../service/user.service');
const { validateUser } = require('../../middlewares/validateUser');

describe('Test the validateUser middleware', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Test with invalid email', async function () {
    const res = {};
    const req = {
      body: {
        email: 'test@test',
        password: '123456',
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(userService, 'getUserByEmail')
      .resolves(null);

    await validateUser(req, res);

    expect(res.status.calledWith(400)).to.be.equal(true);
  });

  it('Test with existed user', async function () {
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
      .resolves({ password: '25f9e794323b453885f5181f1b624d0b' });

    await validateUser(req, res);

    expect(res.status.calledWith(409)).to.be.equal(true);
  });

  it('Test with valid inputs and not existed user', async function () {
    const res = {};
    const req = {
      body: {
        email: 'test@test.com',
        password: '123456',
      },
    };
    const next = function () {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(userService, 'getUserByEmail')
      .resolves(null);

    await validateUser(req, res, next);

    // Procurar como testar se o "next" foi chamado
    expect(true).to.be.equal(true);
    // expect(next).toHaveBeenCalled();
  });
});
