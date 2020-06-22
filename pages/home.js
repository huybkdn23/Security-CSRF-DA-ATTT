const router = require('express').Router();
const jwt           = require('jsonwebtoken');
const collectionUser = require('../user/model');
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const csurf         = require("csurf");

router.get('/', async (req, res) => {
  res.render('home', {
    // csurfToken: req.csrfToken()
  });
});

module.exports = router;