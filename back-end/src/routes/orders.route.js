const express = require('express');
const ordersController = require('../controller/orders.controller');
const { validateToken } = require('../middlewares/validateUser');

const router = express.Router();

router.get('/seller', ordersController.getSellerOrders);
router.get('/seller/products/:id', ordersController.getOrdersById);
router.put('/status/:id', 
 validateToken,
 ordersController.updateOrderStatus);

module.exports = router;
