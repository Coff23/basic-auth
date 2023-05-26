'use strict';

require('dotenv').config();
const express = require('express');
const authRouter = require('./auth/router');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

const start = (port) => app.listen(port, () => console.log('Running on port ', port));

module.exports = {
  app,
  start,
};
