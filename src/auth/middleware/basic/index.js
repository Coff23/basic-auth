'use strict';

const base64 = require('base-64');
const { Users } = require('../../models/index');
const bcrypt = require(';bcrypt');

// const basicAuth = async (req, res, next) => {

//   let basicHeaderParts = req.headers.authorization.split(' ');
//   let encodedString = basicHeaderParts.pop();
//   let decodedString = base64.decode(encodedString);
//   let [username, password] = decodedString.split(':');

//   try {
//     const user = await Users.findOne({ where: { username: username } });
//     const valid = await bcrypt.compare(password, user.password);
//     if (valid) {
//       res.status(200).json(user);
//     }
//     else {
//       throw new Error('Invalid User');
//     }
//   } catch (error) { next('Invalid Login, error: ', error.message); }
// };

const basicAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  const encodedCredentials = req.headers.authorization.split(' ')[1];
  const decodedCredentials = base64.decode(encodedCredentials);
  const [username, password] = decodedCredentials.split(':');

  try {
    const user = await Users.findOne({ where: { username: username } });
    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Unauthorized');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

module.exports = basicAuth;
