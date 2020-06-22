const router = require('express').Router();
const { create, update, transfer, index } = require('../user/controller');
const { isAuthenticated }               = require('../middlewares/authenticate');
const { csurf }         = require('../app');

router.route("/")
.get(index)
.post(create);

router.route('/:id')
.post(isAuthenticated, update);

module.exports = router;