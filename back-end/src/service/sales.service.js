const { Sales } = require('../database/models');
const { SalesProducts } = require('../database/models');
const { User } = require('../database/models');

const getUserByEmail = async (email) => { 
  const result = await User.findOne({ where: { email } });
  return result;
};

const getUserByName = async (name) => User.findOne({ where: { name } });

const createSale = async ({ userEmail, sellerName, totalPrice,
  deliveryAddress, deliveryNumber, productsId, quantity,
}) => {
    const userId = await getUserByEmail(userEmail);
    const seller = await getUserByName(sellerName);
    const sales = await Sales.create({ 
      userId: userId.id,
      sellerId: seller.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      salesDate: Date.now(),
      status: 'Pendente' });
  
    const salesProducts = productsId
      .map(async (product, i) => SalesProducts
        .create({ saleId: sales.id, productId: product, quantity: quantity[i] }));
  
    if (!salesProducts) return null;
    return sales.id;
};

module.exports = {
  createSale,
};
