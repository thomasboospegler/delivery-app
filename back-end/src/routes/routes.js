const express = require('express');

const router = express.Router();
const loginRouter = require('./login.router');
const registerRouter = require('./register.route');
const salesRouter = require('./sales.route');
const productsRouter = require('./products.route');

router.use('/register', registerRouter);

router.use('/login', loginRouter);

router.use('/sales', salesRouter);
router.use('/products', productsRouter);

module.exports = router;
