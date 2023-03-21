const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'cards title can not be empty'],
    minlength: [2, 'cards title cannot be less than 2 symbols'],
    maxlength: [30, 'cards title cannot be longer than 30 symbols'],
  },
  link: {
    type: String,
    required: [true, 'link is required'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'invalid link',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
