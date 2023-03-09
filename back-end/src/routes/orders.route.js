const express = require('express');
const ordersController = require('../controller/orders.controller');
const { validateToken } = require('../middlewares/validateUser');

const router = express.Router();

router.get('/seller', validateToken, ordersController.getSellerOrders);
router.get('/seller/products/:id', validateToken, ordersController.getOrdersById);
router.put('/status/:id', 
 validateToken,
 ordersController.updateOrderStatus);
router.get('/', ordersController.getOrders);

module.exports = router;
