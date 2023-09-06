const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, postUser, getUser } = require('../controllers/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), postUser);

router.get('/users/me', getUser);

module.exports = router;
