
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { env } = require('../config');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 6,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    // minlength: [6, 'Path `password` is shorter than the minimum allowed length (6)']
    validate: {
      validator: (v) => {
        return v.length >= 6;
      },
      message: (props) => `${props.value} is shorter than the minimum allowed length (6); response_code=1111`,
    }
  },
  balance: {
    type: Number,
    min: 0,
    default: 0
  }
}, {
    timestamps: true
  })

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view(full) {
    let view = {}
    let fields = ['id', 'username', 'balance']

    if (full) {
      fields = [...fields, 'password']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },
  authenticate(password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
}

const model = mongoose.model('User', userSchema);
module.exports = model;
  