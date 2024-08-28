const Sequelize = require('sequelize');
const db = require('../db');

const Group = db.define('group', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  leaderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
});

module.exports = Group;
