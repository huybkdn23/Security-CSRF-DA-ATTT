const router        = require('express').Router();
const csurf         = require("csurf");
const collectionUser= require('../user/model');
const jwt           = require('jsonwebtoken');
const { isAuthenticated } = require('../middlewares/authenticate');


router.get('/changepassword', isAuthenticated, (req, res) => {
  res.render("changepassword", {
      // csurfToken: req.csrfToken(),
      user: req.user
  });
});

module.exports = router;