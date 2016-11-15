const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/campaigns', require('./campaigns'));

// for auth testing
router.use('/secret', require('./secret'));


module.exports = router;
