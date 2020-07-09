const db = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, UserSetting } = db.sequelize.models;

exports.signup = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ message: 'Error signing up: Username and password required.' });
      return;
    }
    const email = req.body.email.toLowerCase();
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password,
      email,
      permissions: ['USER'],
    })
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 25 * 365, // 1 year cookie
    });
    res.send(user);
  } catch (error) {
    next(error)
  }
}

exports.signin = async (req, res, next) => {
  try {
    console.log(req.body.email, req.body.password);
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ message: 'Error signing in: Username and password required.' });
      return;
    }
    const user = await User.findOne({
      where: { email: req.body.email }
    });
    const errorMessage = 'Invalid username or password.';
    if (!user) {
      res.status(401).json({ message: errorMessage });
      return;
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      res.status(401).json({ message: errorMessage });
      return;
    };
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 25 * 365, // 1 year cookie
    });
    res.send(user);
  } catch (error) {
    res.clearCookie('token');
    next(error);
  }
}

exports.verify = (req, res) => {
  res.send({ message: 'Verified!' });
}

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Goodbye!' });
}

exports.requestReset = (req, res) => {
  // TODO: implement sending reset email.
}

exports.resetPassword = async (req, res) => {
  // TODO: implement resetting password.
  try {
    req.body.password
    const user = await User.update({
      password: await bcrypt.hash(req.body.password, 10),
    }, {
      where: { email: req.body.email },
    })
    res.send('Password Updated!');
  } catch (error) {
    next(error);
  }
}

exports.updatePermissions = (req, res) => {
  // TODO: implement updating user permissions
}

exports.getSettings = async (req, res) => {
  try {
    const settings = await UserSetting.findOne({
      where: {
        userId: req.user.id,
      },
    });
    res.send(settings);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.updateSettings = (req, res) => {
  // TODO: implement updating user settings
}


exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.update({
      ...req.body,
    }, {
      where: {
        id: req.params.id,
      }
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
}