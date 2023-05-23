'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(cors);

app.use(router);

app.get('/', async (req, res) => {
  res.status(200).send('Hello World');
});

const start = (port) => app.listen(port, () => console.log('Running on port ', port));

module.exports = {
  app,
  start,
};
