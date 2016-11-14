const express = require('express');
const router = express.Router();

router.use('/user', require('./users'));
router.use('/campaign', require('./campaigns'));

// for auth testing
router.use('/secret', require('./secret'));


module.exports = router;
