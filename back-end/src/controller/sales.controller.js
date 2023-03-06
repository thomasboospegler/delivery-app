const SalesService = require('../service/sales.service');

const createSales = async (req, res) => {
    const data = req.body;
    const inserted = await SalesService.createSale(data);
    if (!inserted) return res.status(400).json({ message: 'Some fields are invalid' });
    return res.status(201).json({ insertedId: inserted });
};

module.exports = {
  createSales,
};