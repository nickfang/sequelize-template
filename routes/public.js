var express = require('express');
var router = express.Router();

const publicHandler = require('../handlers/publicHandler');

// Routes that don't need authorization
router.get('/', publicHandler.root);

module.exports = router;
