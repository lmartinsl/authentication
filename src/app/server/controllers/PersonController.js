var PersonModel = require('../models/PersonModel');

module.exports = {
  all: (req, res) => {
    PersonModel.find({}).lean().exec((err, people) => {
      if (err) {
        return res.json([]);
      } else {
        return res.json(people)
      }
    });
  }
};
