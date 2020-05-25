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
    // console.log('@DEBUG auth controller1', await userService.checkIsValidAccountWithToken(req.body.token));
    if (req.body && req.body.token) {
      const user = await userService.checkIsValidAccountWithToken(req.body.token);
      if (user) return res.status(200).json({ code: 'VALID_ACCOUNT', user: user.view(true) });
    }
    if (req.body && req.body.username && req.body.password) {
      const username = req.body.username;
      const password = req.body.password;
      console.log('@DEBUG auth controller', username, password);
      const token = await userService.auth(username, password);
      return res.status(200).json({message: 'Login successful!', token: token});
    }
    return res.status(200).json({code: 'UNAUTHORIZED'});
  } catch (err) {
    console.log('@DEBUG catch error', err);
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
    console.log('@DEBUG error', error);
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
const update = async ({ params: { id }, body }, res) =>
  userCollection.findById(id)
  .then(user => {
    if (!user) throw {
      code: 404,
      messag: 'User not found'
    }
    return user;
  })
  .then(user => user ? Object.assign(user, body, { balance: user.balance + (body.balance || 0) }).save() : null)
  .then(user => user ? user.view(true) : null)
  .then(user => res.status(200).json(user))
  .catch(err => {
      res.status(err.code || 400).json({
        message: err.message
      });
  })
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
module.exports = {
  auth, create, show, update
}