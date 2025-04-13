const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  status: { type: DataTypes.ENUM('pendiente', 'en progreso', 'completada'), defaultValue: 'pendiente' },
  dueDate: DataTypes.DATE,
});

Task.belongsTo(User);
User.hasMany(Task);

module.exports = Task;