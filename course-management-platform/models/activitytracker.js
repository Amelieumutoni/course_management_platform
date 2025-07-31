const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ActivityTracker = sequelize.define('ActivityTracker', {
  week: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  allocationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CourseOfferings',
      key: 'id'
    }
  },
  attendance: {
    type: DataTypes.JSON, // Array of booleans
    allowNull: false,
    defaultValue: []
  },
  formativeOneGrading: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started'
  },
  formativeTwoGrading: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started'
  },
  summativeGrading: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started'
  },
  courseModeration: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started'
  },
  intranetSync: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started'
  },
  gradeBookStatus: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started'
  }
});

module.exports = ActivityTracker;
