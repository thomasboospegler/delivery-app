const { User } = require('../database/models');
const md5 = require('md5');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async ({ name, email, password }) => { 
  const role = 'customer';
  const hash = md5(password);
  const hasUser = await getUserByEmail(email);
  if (hasUser) {
    return null;
  }
  return User.create({ name, email, password: hash, role });
};

module.exports = {
  getUserByEmail,
  createUser,
};
