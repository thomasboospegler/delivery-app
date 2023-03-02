require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const userService = require('../service/user.service');

const secret = process.env.JWT_SECRET || 'jwt_secret';
const jwtConfig = { algorithm: 'HS256', expiresIn: '1d' };

const login = async (req, res) => {
  const { email, password } = req.body;
  const encryptPassword = md5(password);
  const user = await userService.getUserByEmail(email);
  if (!user || encryptPassword !== user.password) {
    return res.status(404).json({ message: 'Invalid fields' });
  }
  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  return res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = await userService.createUser(user);
  if (!newUser) return res.status(409).json({ message: 'User already registered' });
  return res.status(201).json(newUser);
};

module.exports = {
  login,
  createUser,
};
