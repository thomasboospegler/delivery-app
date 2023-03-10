const md5 = require('md5');
const { User } = require('../database/models');

const getByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async ({ name, email, password, role = 'customer' }) => { 
  const hash = md5(password);
  const hasUser = await getByEmail(email);
  if (hasUser) {
    return null;
  }
  return User.create({ name, email, password: hash, role });
};

module.exports = { createUser };