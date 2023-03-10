const express = require('express');
const userController = require('../controller/user.controller');
const { validateToken } = require('../middlewares/validateUser');

const router = express.Router();

router.get('/', validateToken, userController.getAll);
router.post('/create', validateToken, userController.createUser);

module.exports = router;