require('dotenv').config();
const jwt = require('jsonwebtoken');
const loginService = require('../service/login.service');

const secret = process.env.JWT_SECRET;
const jwtConfig = { algorithm: 'HS256', expiresIn: '1d' };

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService.getUserByEmail(email);
  console.log(user, 'service');
  console.log(password);
  console.log(user.password);
  if (!user || password !== user.password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
