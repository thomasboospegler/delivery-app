const { Sales }= require('../database/models');
const { SalesProducts } = require('../database/models');
const { Products } = require('../database/models');
const { User } = require('../database/models');

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const getUserByName = async (name) => User.findOne({ where: { name } });

const createSale = async ({ userEmail, sellerName, totalPrice,
  deliveryAddress, deliveryNumber, productsId, quantity,
}) => {
  const { id } = await getUserByEmail(userEmail);
  const seller = await getUserByName(sellerName);
  const products = [...productsId];
  const sales = await Sales.create({ 
    userId: id,
    sellerId: seller.id,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    salesDate: Date.now(),
    status: 'Pendente' });
  const salesProducts = products
    .map(async (product, i) => SalesProducts
      .create({ saleId: sales.id, productId: product, quantity: quantity[i] }));
  if (!salesProducts) return null;
  return sales.dataValues.id;
};

module.exports = {
  createSale,
};