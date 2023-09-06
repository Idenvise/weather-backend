const options = {
  origin: [
    'http://localhost:5173',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'user'],
  credentials: true,
};

module.exports = {
  options,
};
