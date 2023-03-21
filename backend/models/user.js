const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques',
    minlength: [2, 'users name cannot be less than 2 symbols'],
    maxlength: [30, 'users name cannot be longer than 30 symbols'],
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: [2, 'users info cannot be less than 2 symbols'],
    maxlength: [30, 'users info cannot be longer than 30 symbols'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'invalid link',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'invalid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }, { runValidators: true })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthError('invalid email or password'),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthError('invalid email or password'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
