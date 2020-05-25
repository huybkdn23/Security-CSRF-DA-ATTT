const router = require('express').Router();
const jwt           = require('jsonwebtoken');
const collectionUser = require('../user/model');
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

router.get('/', async (req, res) => {
  // const token = localStorage.getItem('token');
  // console.log('@DEBUG get home page1', token);
  // if (token) {
  //   const payload = await jwt.verify(token, process.env.JWT_SECRET);
  //   let user = await collectionUser.findById(payload.id);
  //   console.log('@DEBUG get home page2', token);
  //   if (user) {
  //     console.log('@DEBUG get home page4', token);
  //     return res.redirect('/balances');
  //   }
  //   else localStorage.removeItem('token');
  // }
  // console.log('@DEBUG get home page3', token);
  res.render('home');
});

module.exports = router;