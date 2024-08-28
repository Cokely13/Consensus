const Sequelize = require('sequelize');
const db = require('../db');

const Question = db.define('question', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  optionA: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  optionB: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Question;
