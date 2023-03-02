const SalesService = require('../service/sales.service');

const createSales = async (req, res) => {
  try {
    const data = req.body;
    const inserted = await SalesService.createSale(data);
    return res.status(201).json({ ...inserted });
  } catch (error) {
    return res.status(500).json({ message: 'internal server error' });
  }
};

module.exports = {
  createSales,
};