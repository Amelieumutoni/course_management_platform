const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cohort = sequelize.define('Cohort', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Cohort;
