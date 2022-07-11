var UserModel = require('../models/UserModel');
var bcrypt = require('bcryptjs');
var consts = require('../consts');

module.exports = {
  register: async function (req, res) {

    try {
      let u = await UserModel.findOne({ email: req.body.email });
      if (!u) {
        const user = new UserModel(req.body);
        user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts)
        await user.save();
        delete user.password;
        res.status(200).json(user);
      } else {
        res.status(403).json({ msgError: 'Email already registered!', error: {} });
      }
    } catch (error) {
      res.status(500).json({ msgError: 'Error while saving the user!', error });
    }

  },
  login: function (req, res) {

  }
}
