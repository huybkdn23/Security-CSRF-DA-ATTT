const router = require('express').Router();
const csurf         = require("csurf");

router.get('/signup', (req, res) => {
  res.render('signup', {
    // csurfToken: req.csrfToken()
  });
});

module.exports = router;