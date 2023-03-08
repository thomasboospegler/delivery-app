const productsService = require('../service/products.service');

const getAllProducts = async (_req, res) => {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  };

module.exports = {
    getAllProducts,
};
