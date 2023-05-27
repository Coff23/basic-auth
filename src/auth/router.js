'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require('./models/index');
const basicAuth = require('../auth/models/index');

router.use(express.urlencoded({ extended: true }));

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 5);
    let newUser = await Users.create({
      username,
      password: encryptedPassword,
    });
    res.status(200).send(newUser);
  } catch (err) {
    console.error(err);
    next('signup error occurred');
  }
});

// router.post('/signin', basicAuth, (req, res) => {
//   try {
//     res.status(200).send(req.user);

//   } catch (error) {
//     console.error(error);
//     res.status(401).send('Unauthorized user');
//   }
// });

router.post('/signin', basicAuth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.error(error);
    res.status(401).send('Unauthorized user');
  }
});

module.exports = router;
