const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          const genToken = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'mega-secret-key', { expiresIn: '7d' });
          res.send({
            token: genToken,
            user: {
              email: user.email,
              _id: user._id,
              name: user.name,
            },
          });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.postUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash,
      })
        .then((user) => {
          res.send({
            email: user.email,
            id: user._id,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорректные данные'));
            return;
          }
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.headers.user)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
