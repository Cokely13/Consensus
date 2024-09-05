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
  dateAsked: {
    type: Sequelize.DATE,
    unique: true
  },
  expired: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});

module.exports = Question;
