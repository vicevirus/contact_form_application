const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'koa',
  process.env.DB_USER || 'user',
  process.env.DB_PASSWORD || 'user',
  {
    host: process.env.DB_HOST || 'db',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
  }
);

module.exports = sequelize;