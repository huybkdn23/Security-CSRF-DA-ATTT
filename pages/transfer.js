const router        = require('express').Router();
// const csurf         = require("csurf");
const csurf         = require('csurf');
const collectionUser= require('../user/model');
const jwt           = require('jsonwebtoken');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/transfer', isAuthenticated, (req, res) => {
  res.render("transfer", {
      // csurfToken: req.csrfToken(),
      user: req.user
  });
});

// router.get('/transfer', (req, res) => {
//   res.render("transfer", {
//       csurfToken: req.csrfToken()
//   });
// });

module.exports.router = router;