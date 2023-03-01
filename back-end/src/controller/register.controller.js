const registerService = require('../service/register.service');

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = await registerService.createUser(user);
  return res.status(201).json(newUser);
};

module.exports = { createUser };