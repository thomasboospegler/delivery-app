const registerService = require('../service/register.service');

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = await registerService.createUser(user);
  if (!newUser) return res.status(409).json({ message: 'User already registered' });
  return res.status(201).json(newUser);
};

module.exports = { createUser };