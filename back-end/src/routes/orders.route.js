const express = require('express');
const OrdersController = require('../controller/orders.controller');
// const { validateToken } = require('../middlewares/validateUser');

const router = express.Router();

router.get('/', OrdersController.getOrders);

router.get('/:id', OrdersController.getCustomerOrderById);

module.exports = router;
