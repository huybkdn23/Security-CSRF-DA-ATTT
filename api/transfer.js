const router = require('express').Router();
const { transfer } = require('../user/controller');
const { isAuthenticated }               = require('../middlewares/authenticate');
const csurf       = require('csurf');
// router.use(csurf());

router.route('/')
.get(isAuthenticated, transfer);


module.exports = router;