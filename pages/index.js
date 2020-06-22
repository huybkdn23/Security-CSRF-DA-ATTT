const router      = require('express').Router();
const home        = require('./home');
const signup      = require('./signup');
const balance     = require('./balance');
const changepassword = require('./changepassword');
const user        = require('./list');
const detail        = require('./detail');
const { router:transfer } = require('./transfer');

router.use(home);
router.use(signup);
router.use(balance);
router.use(transfer);
router.use(changepassword);
router.use(user);
router.use(detail);

module.exports = router;