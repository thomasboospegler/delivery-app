const express = require('express');

const router = express.Router();
const loginRouter = require('./login.router');
const registerRouter = require('./register.route');
const salesRouter = require('./sales.route');
const productsRouter = require('./products.route');
const sellerRouter = require('./sellers.route');
const ordersRouter = require('./orders.route');

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/sales', salesRouter);
router.use('/products', productsRouter);
router.use('/seller', sellerRouter);
router.use('/orders', ordersRouter);

module.exports = router;
