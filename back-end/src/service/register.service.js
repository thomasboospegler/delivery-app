const md5 = require('md5');
const { User } = require('../database/models');

const createUser = async ({ name, email, password }) => { 
  const role = 'customer';
  const hash = md5(password);
  await User.create({ name, email, password: hash, role });
};

module.exports = { createUser };