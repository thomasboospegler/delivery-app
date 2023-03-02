const { loginSchema } = require('./schemas');
const userService = require('../service/user.service');

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await userService.getUserByEmail(email);
  if (user) return res.status(409).json({ message: 'User already registered' });

  next();
};

module.exports = validateUser;
