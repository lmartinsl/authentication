var UserModel = require('../models/UserModel');
var bcrypt = require('bcryptjs');
var consts = require('../consts');
var jwt = require('jsonwebtoken');

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
    const password = req.body.password;
    const email = req.body.email;

    UserModel.findOne({ email }).lean().exec((err, user) => {
      if (err) {
        return res.status(500).json({
          message: 'Server error', err
        })
      }

      const auth_error = (password === '' || password === null || !user);

      if (!auth_error) {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT });
          delete user.password;
          return res.json({
            ...user,
            token
          })
        }
      }

      return res.status(404).json({
        message: 'Wrong email or password!'
      })

    })

  }
}
