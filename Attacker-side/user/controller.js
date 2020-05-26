const userService = require('./service');
module.exports = {
  login, signup
}

/**
* @name login
* @description
* Check username password
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
*/
async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const token = await userService.login(username, password);
    res.status(200).json({message: 'Login successful!', token: token});
  } catch (err) {
    res.status(err.code).json({message: err.message});
  }
}

/**
* @name signup
* @description
* Check username password
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
*/
const signup = (req, res) =>
  userService.signup(req.body)
  .then((result) => {
    res.status(201).json(result);
  })
  .catch(error => {
    res.status(err.code).json({
      message: err.message
    });
  });

  /**
  * @name updateBalance
  * @description
  * Check username password
  * @param  {object}   req  HTTP request
  * @param  {object}   res  HTTP response
  */
  const updateBalance = (req, res) =>
    userService.updateBalance(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(err.code).json({
        message: err.message
      });
    });