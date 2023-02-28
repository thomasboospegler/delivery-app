const { User } = require('../database/models');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  console.log(user)
  return user;
};

module.exports = {
  getUserByEmail,
};