const { Sales } = require('../database/models');
const { SalesProducts } = require('../database/models');
const { User } = require('../database/models');

const getUserByEmail = async (email) => { 
  // console.log(email, 'getuserByemail');
  const result = await User.findOne({ where: { email } });
  console.log(result, 'result');
  return result;
};

const getUserByName = async (name) => {
  console.log(name, 'getbyName'); 
  return User.findOne({ where: { name } });
};

const createSale = async ({ userEmail, sellerName, totalPrice,
  deliveryAddress, deliveryNumber, productsId, quantity,
}) => {
    console.log(sellerName, 'sellerName');
    const userId = await getUserByEmail(userEmail);
    const seller = await getUserByName(sellerName);
    // console.log(seller, 'seller');
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