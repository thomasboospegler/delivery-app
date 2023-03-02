const express = require('express');
const SalesController = require('../controller/sales.controller');

const router = express.Router();

router.post('/create', SalesController.createSales);

module.exports = router;
