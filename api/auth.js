const router      = require('express').Router();
const { auth }        = require('../user/controller');
const csurf = require('csurf');

router.route("/")
.post(auth);

module.exports = router;