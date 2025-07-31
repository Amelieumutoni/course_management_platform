const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('manager', 'facilitator'), allowNull: false }
});

// Before saving a User, hash their password if it was changed
User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 10); // 10 salt rounds
  user.password = hashedPassword;
});

module.exports = User;
