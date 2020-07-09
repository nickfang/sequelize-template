const db = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = db.sequelize.model;

exports.root = (req, res, next) => {
  res.render('index', { title: 'Savings Wheel' });
}


