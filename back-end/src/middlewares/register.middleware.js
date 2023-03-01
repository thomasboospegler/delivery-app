const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(12).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateRegister = (req, res, next) => {
  const user = req.body;

  const { error } = userSchema.validate(user);
  if (error) return res.status(400).json({ message: 'Some fields are invalid' });

  next();
};

module.exports = { validateRegister };