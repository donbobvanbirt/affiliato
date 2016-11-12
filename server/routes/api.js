const express = require('express');
const router = express.Router();

router.use('/user', require('./users'));
router.use('/campaign', require('./campaigns'));

module.exports = router;
