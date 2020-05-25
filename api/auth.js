const router      = require('express').Router();
const { auth }        = require('../user/controller');

router.route("/auth")
.post(auth);

module.exports = router;