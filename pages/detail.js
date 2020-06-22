const router        = require('express').Router();
const csurf         = require("csurf");
const collectionUser= require('../user/model');
const jwt           = require('jsonwebtoken');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/user', async (req, res) => {
  const user = await collectionUser.findById(req.query.id);
  if (!user) return res.status(404).send('PAGE NOT FOUND');
  res.render("detail", {
      // csurfToken: req.csrfToken(),
      user: user
  });
});

module.exports = router;