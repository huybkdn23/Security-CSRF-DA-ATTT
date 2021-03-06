const router        = require('express').Router();
const csurf         = require("csurf");
const collectionUser= require('../user/model');
const jwt           = require('jsonwebtoken');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/balances', isAuthenticated, (req, res) => {
  res.render("balance", {
      // csurfToken: req.csrfToken(),
      user: req.user
  });
  // res.render('balance');
  // res.status(200).json({message: 'abc'});
});

module.exports = router;