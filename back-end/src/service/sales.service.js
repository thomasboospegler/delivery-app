const Sales = require('../database/models/Sales');
const SalesProducts = require('../database/models/SalesProducts');
const Products = require('../database/models/Products');
const Users = require('../database/models/Users');

const getUserByEmail = async (email) => Users.findOne({ where: { email } });

const getUserByName = async (name) => Users.findOne({ where: { name } });

const createSale = async ({ userEmail, sellerName, totalPrice,
  deliveryAddress, deliveryNumber, productsName, quantity,
}) => {
  const { id } = await getUserByEmail(userEmail);
  const seller = await getUserByName(sellerName);
  const products = productsName.map(async (name) => Products.findOne({ where: { name } }));
  const sales = await Sales.create({ 
    userId: id,
    sellerId: seller.id,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    salesDate: Date.now(),
    status: 'Pendente' });
  const salesProducts = products
    .forEach(async (product, i) => SalesProducts
      .create({ saleId: sales.id, productId: product.id, quantity: quantity[i] }));
  return salesProducts;
};

module.exports = {
  createSale,
};