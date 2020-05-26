const jwt             = require('jsonwebtoken');
const collectionUser  = require('./model.js');
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

module.exports = {
  auth, create, checkIsValidAccountWithToken
}

/**
* @name auth
* @description
* Check username password
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
*/
async function auth(username, password) {
  const user = await collectionUser.findOne({ username });
  console.log('@DEBUG auth service', user);
  if (!user) throw {
    code: 401,
    message: 'User is not exist!'
  }
  if (await user.authenticate(password)) {
    
    console.log('@DEBUG auth controller3');
    const payload = {id: user._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    // localStorage.setItem('token', token);
    console.log(`Token: ${token}`);
    return token;
  }
  else throw {
    code: 400,
    message: 'Incorrect password!'
    }
}

/**
* @name auth
* @description
* Check username password
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
*/
async function checkIsValidAccountWithToken(token) {
  if (!token) return false;
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await collectionUser.findById(payload.id);
  return user;
}

/**
* @name create
* @description
* Check username password
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
*/
async function create({ username, password }) {
  const user = await collectionUser.findOne({username});
  console.log('@DEBUG1 create Service', username, password);
  if (user) throw {
    code: 400,
    message: 'User is exist in database, please try another!'
  }
  console.log('@DEBUG2 create Service', username, password);
  
  console.log('@DEBUG3 create Service', username, password);
  return collectionUser.create({ username, password });
}