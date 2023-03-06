const express = require('express');
const UserController = require('../controller/user.controller');

const router = express.Router();

router.get('/', UserController.getSellers);

module.exports = router;
