const SalesService = require('../service/sales.service');

const createSales = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const inserted = await SalesService.createSale(data);

    if (!inserted) return res.status(400).json({ message: 'Some fields are invalid' });
    return res.status(201).json({ insertedId: inserted });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createSales,
};