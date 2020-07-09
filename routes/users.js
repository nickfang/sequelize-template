const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userHandler = require('../handlers/userHandler');

/* GET users listing. */
router.post('/signup', userHandler.signup);
router.post('/signin', userHandler.signin);
router.get('/verify', auth.checkUser, userHandler.verify);
router.post('/signout', userHandler.signout);
router.post('/resetPassword', auth.checkUser, userHandler.resetPassword);
router.route('/settings')
  .all(auth.checkUser)
  .get(userHandler.getSettings)
  .put(userHandler.updateSettings);
router.get('/:id', userHandler.getUser);
router.post('/:id', userHandler.updateUser);
router.get('/', userHandler.getUsers);
module.exports = router;
