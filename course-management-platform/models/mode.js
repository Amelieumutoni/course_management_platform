const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mode = sequelize.define('Mode', {
  type: {
    type: DataTypes.ENUM('Online', 'In-person', 'Hybrid'),
    allowNull: false
  }
});

module.exports = Mode;
