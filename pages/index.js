const router      = require('express').Router();
const home        = require('./home');
const signup      = require('./signup');
const balance     = require('./balance');

router.use(home);
router.use(signup);
router.use(balance);

module.exports = router;