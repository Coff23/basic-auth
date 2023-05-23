'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./auth/router');

const app = express();

app.use(express.json());
app.use(cors);

app.get('/', async (req, res) => {
  res.status(200).send('Hello World');
});

app.use(authRouter);

const start = (port) => app.listen(port, () => console.log('Running on port ', port));

module.exports = {
  app,
  start,
};
