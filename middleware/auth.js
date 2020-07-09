const db = require('../database/models');
const jwt = require('jsonwebtoken');
const { User } = db.sequelize.models;

// Get the token from the cookie
// Check that the JWT is valid
// Pull the userID from the JWT
// Add it to the req so controllers have access to it
// If anything fails, send an error and bypass the controllers
exports.checkUser = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    res.status(401).json({ message: 'Not logged in.' });
    return;
  }

  jwt.verify(token, process.env.APP_SECRET);
  const decoded = jwt.decode(token);
  if (!decoded.userId) {
    res.status(401).json({ message: 'Invalid JWT.' });
    return;
  }
  
  try {
    const user = await User.findOne({
      where: { id: decoded.userId }
    });
    req.user = user;
    next();
  } catch (error){
    // if this doesn't return json, go back to commented code.
    next(error);
    // res.status(400).json({ message: 'Server Error: User not found.'})
    // return;
  }
};
