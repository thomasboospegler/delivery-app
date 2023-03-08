const express = require('express');
const ordersController = require('../controller/orders.controller');
const { validateToken } = require('../middlewares/validateUser');

const router = express.Router();

router.get('/seller', ordersController.getSellerOrders)

module.exports = router;
