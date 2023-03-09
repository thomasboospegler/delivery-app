const { Sales } = require('../database/models');
const { User } = require('../database/models');
const { Products } = require('../database/models');

const getSellerByEmail = async (email) => User.findOne({ where: { email } });

const getUserByEmail = async (email) => { 
  const result = await User.findOne({ where: { email } });
  return result.id;
};

const getSellerOrders = async (user) => {
  const sellerId = await getSellerByEmail(user);
  if (!sellerId) return null;
  const orders = await Sales.findAll({ where: { sellerId } });
  return orders;
};

const getOrderById = async (id) => {
  const orders = await Sales.findOne(
    { 
      where: { id }, 
      include: [
      {
        model: Products,
        as: 'products',
        attributes: ['id', 'name', 'price'],
        through: { attributes: ['quantity'] },
      },
      ],
    },
  );
  return orders;
};

const getOrders = async (user) => {
  const userId = await getUserByEmail(user);
  const orders = await Sales.findAll({ where: { userId } });
  return orders;
};

const updateOrderStatus = async (id, status) => {
  await Sales.update({ status }, { where: { id } });
};

module.exports = { 
  getSellerOrders,
  getOrderById,
  updateOrderStatus,
  getOrders,
};
