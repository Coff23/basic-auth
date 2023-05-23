'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users } = require('./models/index');

router.use(express.urlencoded({ extended: true }));

router.post('/signup', async (req, res, next) => {
  console.log('this is the req.body from signup', req.body);
  try {
    console.log('signup route is here');
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const record = await Users.create(req.body);
    res.status(200).send(record);
  } catch (error) {
    next(error.message);
  }
});

module.exports = router;
