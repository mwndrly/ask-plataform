const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Question = database.define('Question', {
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	is_deleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
}, {
	tableName: 'questions'
});

Question.sync();

module.exports = Question;