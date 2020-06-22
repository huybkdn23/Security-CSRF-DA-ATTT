const userService = require('./service');
const userCollection = require('./model');
/**
* @name auth
* @description
* Check username password
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
*/
async function auth(req, res) {
  try {
    console.log('@DEBUG auth');
    if (req.body && req.body.token) {
      const user = await userService.checkIsValidAccountWithToken(req.body.token);
      if (user) return res.status(200).json({ code: 'VALID_ACCOUNT', user: user.view(true) });
    }
    if (req.body && req.body.username && req.body.password) {
      const username = req.body.username;
      const password = req.body.password;
      const token = await userService.auth(username, password);
      return res.status(200).json({message: 'Login successful!', token: token});
    }
    return res.status(200).json({code: 'UNAUTHORIZED'});
  } catch (err) {
    res.status(err.code || 400).json({message: err.message});
  }
}

/**
* @name create
* @description
* Check username password
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
*/
const create = async (req, res, next) =>
  userService.create(req.body)
  .then((result) => {
    res.status(201).json(result);
  })
  .catch(error => {
    res.status(error.code || 400).json({
      message: error.message
    });
  });

/**
* @name update
* @description
* Check username password
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
*/
const update = async (req, res) =>
  {
    console.log('@DEBUG update', req.params.id, req.body.new_password);
    return userCollection.findById(req.params.id)
  .then(user => {
    if (!user) throw {
      code: 404,
      messag: 'User not found'
    }
    return user;
  })
  .then(user => user ? Object.assign(user, req.body, { balance: user.balance + (Number(req.body.balance) || 0) }).save() : null)
  .then(async user => {
    console.log('@DEBUG update1');
    if (req.body.new_password && req.body.confirm_new_password && req.body.confirm_new_password === req.body.new_password) {
      await Object.assign(user, { password: req.body.new_password }).save();
      console.log('@DEBUG update2');
      res.clearCookie('token');
      return res.redirect('/');
      // res.status(200).json(user);
    }
    res.redirect(req.get('referer'))
  })
  .catch(err => {
      res.status(err.code || 400).json({
        message: err.message
      });
  })}
  // {
  //   console.log('@DEBUG update controller', id, body);
  //   return userService.update(id, body)
  //   .then((result) => {
  //     res.status(200).json(result);
  //   })
  //   .catch(error => {
  //     res.status(error.code || 400).json({
  //       message: error.message
  //     });
  //   });
  // }
    
const show = async ({ id }, res) =>
  userCollection.findById(id)
  .then(user => user ? user.view() : null)
  .catch(error => {
    res.status(error.code || 400).json({
      message: error.message
    });
  });

  /**
  * @name transfer
  * @description
  * Check username password
  * @param  {object}   req  HTTP request
  * @param  {object}   res  HTTP response
  */
  const transfer = async (req, res) =>
    {
      console.log('@COOKIE', req.query);
      return userService.transfer(req.user, req.query.account_id, req.query.balance)
      // .then(user => user ? user.view(true) : null)
      .then(user => res.redirect(req.get('referer')))
      .catch(err => {
          res.status(err.code || 400).json({
            message: err.message
          });
      })
    }
    
const index = async (req, res) =>
  userCollection.find({})
  .then(users => users.map(user => user.view(true)))
  .then(users => users.length ? res.status(200).json(users) : null)
  .catch(error => {
    res.status(error.code || 400).json({
      message: error.message
    });
  });
    
module.exports = {
  auth, create, show, update, transfer, index
}