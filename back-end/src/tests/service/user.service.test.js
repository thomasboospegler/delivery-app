const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../database/models');
const userService = require('../../service/user.service');

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
});
