const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Answer = database.define('Answer', {
	body: {
		type: DataTypes.STRING,
		allowNull: false
	},
	question_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	is_deleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
}, {
	tableName: 'answers'
});

Answer.sync();

module.exports = Answer;