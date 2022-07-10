var ProductModel = require('../models/ProductModel');

module.exports = {
  all: (req, res) => {
    ProductModel.find({}).lean().exec((err, products) => {
      if (err) {
        return res.json([]);
      } else {
        return res.json(products)
      }
    });
  }
};
