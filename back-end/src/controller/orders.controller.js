const fs = require('fs');
const ordersService = require('../service/orders.service');
const jwt = require('jsonwebtoken');

const jwtKey = fs.readFileSync('jwt.evaluation.key');


const getSellerOrders = async (req, res) => {
    try {
      const { authorization } = req.headers;
      const decoded = jwt.verify(authorization, jwtKey );
      if (decoded.data.role !== 'seller') return res.status(401).end();
      const orders = await ordersService.getSellerOrders(decoded.data.email);
  
      if (!orders) return res.status(404).json({ message: 'Orders Not Found' });
  
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  const getOrdersById = async (req, res) => {
    try {
      const { id } = req.params;
      const orders = await ordersService.getOrderById(id);
      console.log(orders);
      return res.status(200).json({...orders});
    } catch (error) {
      return res.status(500).end();
    }
  }
  
  module.exports = {
    getSellerOrders,
    getOrdersById,
  };