const jwt             = require('jsonwebtoken');
const collectionUser  = require('../user/model');

module.exports = {
  isAuthenticated, getCookie
}

function getCookie(cookie, name) {
  var nameEQ = name + "=";
  var ca = cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

/**
* @name isAuthenticated
* @description
* Authentication
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
* @param  {Function} next Next middleware
*/
async function isAuthenticated(req, res, next)  {
  // if (!req.headers.authorization ||
  //   req.headers.authorization.split(' ')[0] !== 'Bearer') {
  //     res.status(401).json({message: 'User is not authorized!'});
  //   }
  // const token = req.headers.authorization.split(' ')[1];
  const token = getCookie(req.headers.cookie, 'token');
  if (!token) return res.status(401).send('User is not authorized!');
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    let user = await collectionUser.findById(payload.id);
    if (!user) res.status(401).send('User is not authorized!');
    req.user = user;
    next();
  } catch (err) {
    return next(new Error(err.message));
  }
}