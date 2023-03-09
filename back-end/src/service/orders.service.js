const { Sales } = require('../database/models');
const { User } = require('../database/models');
const { Products } = require('../database/models');
const { SalesProducts } = require('../database/models');

const getSellerByEmail = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result.id;
}


const getSellerOrders = async (user) => {
  const sellerId = await getSellerByEmail(user);
  if(!sellerId) null
  const orders = await Sales.findAll({ where: { sellerId: sellerId } });
  return orders;
}

const getOrderById = async (id) => {
  const orders = await Sales.findOne(
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
  return orders;
}

module.exports = { getSellerOrders, getOrderById };