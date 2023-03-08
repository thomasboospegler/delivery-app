const express = require('express');
const SalesController = require('../controller/sales.controller');
const { validateToken } = require('../middlewares/validateUser');

const router = express.Router();

router.post('/create', validateToken, SalesController.createSales);

module.exports = router;
