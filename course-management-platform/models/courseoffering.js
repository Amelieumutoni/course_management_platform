const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Module = require('./module');
const Cohort = require('./cohort');
const Class = require('./class');
const Mode = require('./mode');

const CourseOffering = sequelize.define('CourseOffering', {
  trimester: {
    type: DataTypes.STRING,
    allowNull: false
  },
  intake: {
    type: DataTypes.ENUM('HT1', 'HT2', 'FT'),
    allowNull: false
  }
});

// Foreign Keys
User.hasMany(CourseOffering, { foreignKey: 'facilitatorId' });
CourseOffering.belongsTo(User, { foreignKey: 'facilitatorId' });

Module.hasMany(CourseOffering, { foreignKey: 'moduleId' });
CourseOffering.belongsTo(Module, { foreignKey: 'moduleId' });

Cohort.hasMany(CourseOffering, { foreignKey: 'cohortId' });
CourseOffering.belongsTo(Cohort, { foreignKey: 'cohortId' });

Class.hasMany(CourseOffering, { foreignKey: 'classId' });
CourseOffering.belongsTo(Class, { foreignKey: 'classId' });

Mode.hasMany(CourseOffering, { foreignKey: 'modeId' });
CourseOffering.belongsTo(Mode, { foreignKey: 'modeId' });


// Activity Tracker relationship
const ActivityTracker = require('./activitytracker');

CourseOffering.hasMany(ActivityTracker, { foreignKey: 'allocationId' });
ActivityTracker.belongsTo(CourseOffering, { foreignKey: 'allocationId' });


module.exports = CourseOffering;
