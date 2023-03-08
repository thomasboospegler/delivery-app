const { Sales } = require('../database/models');
const { User } = require('../database/models');

const getUserByEmail = async (email) => { 
  const result = await User.findOne({ where: { email } });
  return result.id;
};

const getOrders = async (user) => {
  const userId = await getUserByEmail(user);
  const orders = await Sales.findAll({ where: { userId } });
  return orders;
};

module.exports = {
  getOrders,
};
