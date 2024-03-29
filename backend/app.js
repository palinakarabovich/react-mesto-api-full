const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const regEx = require('./constants/constants');

const {
  login, createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server is going to crush');
  }, 0);
});

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://palinakarabovich:2228481Polina@cluster0.evd0eld.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regEx),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);
app.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Page does not exist'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
