const express = require('express');
const userController = require('../controller/register.controller');
const { validateRegister } = require('../middlewares/register.middleware');

const router = express.Router();

router.post('/', 
validateRegister,
userController.createUser);

module.exports = router;