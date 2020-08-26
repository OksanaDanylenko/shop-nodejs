const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'wami124355', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
