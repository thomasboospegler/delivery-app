const express = require('express');
const productsController = require('../controller/products.controller');
const router = express.Router();
const validateLogin = require('../middlewares/validateUser')
router.get('/', 
// validateLogin.validateToken,
productsController.getAllProducts);

module.exports = router;
