const router = require('express').Router();
const { create, update } = require('../user/controller');

router.route("/")
.post(create);

router.route('/:id')
.put(update);

module.exports = router;