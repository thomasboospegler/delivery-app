const { Sales } = require('../database/models');
const { User } = require('../database/models');


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

module.exports = { getSellerOrders }