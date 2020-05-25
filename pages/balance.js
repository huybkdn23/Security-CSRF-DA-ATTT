const router        = require('express').Router();
const csurf         = require("csurf");
const collectionUser= require('../user/model');
const jwt           = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

router.use(csurf());
router.get('/balances', (req, res) => {
  console.log('@DEBUG /balances');
  res.render("balance", {
      csurfToken: req.csrfToken()
  });
  // res.render('balance');
  // res.status(200).json({message: 'abc'});
});

module.exports = router;