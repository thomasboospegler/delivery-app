const express = require('express');
const OrdersController = require('../controller/orders.controller');
const { validateToken } = require('../middlewares/validateUser');

const router = express.Router();

router.get('/', OrdersController.getOrders)

module.exports = router;
