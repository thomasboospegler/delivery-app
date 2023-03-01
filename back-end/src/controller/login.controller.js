require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const loginService = require('../service/login.service');

const secret = process.env.JWT_SECRET || 'jwt_secret';
const jwtConfig = { algorithm: 'HS256', expiresIn: '1d' };

const login = async (req, res) => {
  const { email, password } = req.body;
  const encryptPassword = md5(password);
  const user = await loginService.getUserByEmail(email);
  if (!user || encryptPassword !== user.password) {
    return res.status(404).json({ message: 'Invalid fields' });
  }
  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
