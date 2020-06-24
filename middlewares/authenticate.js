const jwt             = require('jsonwebtoken');

/**
* @name isAuthenticated
* @description
* Authentication
* @param  {object}   req  HTTP request
* @param  {object}   res  HTTP response
* @param  {Function} next Next middleware
*/
async function isAuthenticated(req, res, next)  {
  if (!req.headers.authorization ||
    req.headers.authorization.split(' ')[0] !== 'Bearer') {
      res.status(401).json({message: 'User is not authorized!'});
    }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const payload = await jwt.verify(token, process.env.jwtSecret);
    let user = await collectionUser.findById(payload.id)
    .exec();
    if (!user) res.status(401).json({message: 'User is not authorized!'});
    req.user = user;
    next();
  } catch (err) {
    return next(new Error(err.message));
  }
}