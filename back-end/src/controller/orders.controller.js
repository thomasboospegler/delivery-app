const OrdersService = require('../service/orders.service');

const getOrders = async (req, res) => {
  try {
    const { user } = req.query;
    const orders = await OrdersService.getOrders(user);

    if (!orders) return res.status(404).json({ message: 'Orders Not Found' });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getCustomerOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrdersService.getCustomerOrderById(id);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getOrders,
  getCustomerOrderById,
};
