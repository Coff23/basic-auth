'use strict';

require('dotenv').config();
const { database } = require('./src/auth/models/index');
const { start } = require('./src/server');
const PORT = process.env.PORT || 3002;

database.sync()
  .then(() => {
    console.log('Database connected');

    start(PORT);
  })
  .catch(err => console.error(err));
