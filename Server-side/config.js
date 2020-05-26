/* eslint-disable no-unused-vars */
const path = require('path');

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}
require('dotenv').config();

// /* istanbul ignore next */
// if (process.env.NODE_ENV !== 'production') {
//   const dotenv = require('dotenv-safe')
//   dotenv.load({
//     path: path.join(__dirname, '../.env'),
//     sample: path.join(__dirname, '../.env.example')
//   })
// }

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '/api',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    }
  },
  test: { },
  development: {
    mongo: {
      // uri: `mongodb://${requireProcessEnv('DB_HOST')}/security-db`,
      uri: `mongodb+srv://huybkdn23:wjRF8RmoZMrW7SqL@cluster1-gujje.gcp.mongodb.net/security-db?retryWrites=true&w=majority`,
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1/blogs-backend'
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
// export default module.exports
