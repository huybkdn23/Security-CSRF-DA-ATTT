const router        = require('express').Router();
const csurf         = require("csurf");
const collectionUser= require('../user/model');
const jwt           = require('jsonwebtoken');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/list', (req, res) => {
  res.render("list", {
      // csurfToken: req.csrfToken()
  });
});

module.exports = router;