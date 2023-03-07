require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const userService = require('../service/user.service');
const fs = require('fs');

const jwtKey = fs.readFileSync('jwt.evaluation.key');


// const secret = process.env.JWT_SECRET || 'secret_key'; // 
const jwtConfig = { algorithm: 'HS256', expiresIn: '1d' };

const login = async (req, res) => {
  const { email, password } = req.body;
  const encryptPassword = md5(password);
  const user = await userService.getUserByEmail(email);
  if (!user || encryptPassword !== user.password) {
    return res.status(404).json({ message: 'Invalid fields' });
  }
  console.log(user);
  const token = jwt.sign({ data: { email, name: user.name, role: user.role  } }, jwtKey, jwtConfig);
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
