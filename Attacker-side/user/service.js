const collectionUser = require('./model.js');

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
async function login(email, password) {
  const user = await collectionUser.findOne({email: email})
  .orFail((error) => {
    throw {
      code: 401,
      message: 'User is not exist!',
      error: error.message
    }
  })
  .exec();
  if (user.verifyPassword(password)) {
    const payload = {id: user._id};
    const token = jwt.sign(payload, process.env.jwtSecret, {expiresIn: '1d'});
    console.log(`Token: ${token}`);
    return token;
  }
  else throw {
    code: 400,
    message: 'Login error'
    }
}

/**
* @name signup
* @description
* Check username password
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
*/
async function signup({ email, password }) {
  const user = await collectionUser.findOne({email: email});
  if (user) throw {
    code: 400,
    message: 'User is exist in database, please try another!'
  }
  return await collectionUser.create({ email, password });
}