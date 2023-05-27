'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const authRouter = require('./auth/router');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(authRouter);

app.use('*', notFound);
app.use(errorHandler);

const start = (port) => app.listen(port, () => console.log('Running on port ', port));

module.exports = {
  app,
  start,
};
