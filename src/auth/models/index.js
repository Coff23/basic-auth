'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { userModel } = require('./user-models');

const DATABASE_URL = process.env.DATABASE_URL === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
let Users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  Users,
};
