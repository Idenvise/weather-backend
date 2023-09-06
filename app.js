require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');
const { options } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const signInSignUp = require('./routes/auth');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const limiter = require('./middlewares/limiter');
const { mongoDev } = require('./utils/consts');

const { NODE_ENV, MONGO, PORT = 3000 } = process.env;

const app = express();

app.use('*', cors(options));
app.use(helmet());
app.use(bodyParser.json());

mongoose.connect(NODE_ENV === 'production' ? MONGO : mongoDev);

app.use(requestLogger);

app.use(limiter);

app.use('/', signInSignUp);

app.use(auth);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandler);

app.listen(PORT);
