const router = require('express').Router();
const { create, update } = require('../user/controller');
const csurf         = require("csurf");
router.use(csurf());

router.route("/")
.post(create);

router.route('/:id')
.put(update);

module.exports = router;