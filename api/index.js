const router      = require('express').Router();
const auth        = require('./auth');
const user        = require('./user');
const transfer    = require('./transfer');

router.use('/auth', auth);
router.use('/users', user);
router.use('/transferring', transfer);

module.exports = router;