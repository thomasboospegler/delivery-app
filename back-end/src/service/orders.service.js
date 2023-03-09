const { Sales } = require('../database/models');
const { User } = require('../database/models');
const { Products } = require('../database/models');
// const { SalesProducts } = require('../database/models');

const getUserByEmail = async (email) => { 
  const result = await User.findOne({ where: { email } });
  return result.id;
};

const getOrders = async (user) => {
  const userId = await getUserByEmail(user);
  const orders = await Sales.findAll({ where: { userId } });
  return orders;
};

const getCustomerOrderById = async (id) => {
  const order = await Sales.findOne(
    { 
      where: { id }, 
      include: [
      {
        model: Products,
        as: 'products',
        attributes: ['id', 'name', 'price'],
        through: { attributes: ['quantity'] }
      },
    ]});
  return order;
};

module.exports = {
  getOrders,
  getCustomerOrderById,
};
