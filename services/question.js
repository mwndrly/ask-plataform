const QuestionModel = require('../models/Question');

const store = async data => {
	await QuestionModel.create(data);

	return await index();
};

const index = async () => {
	return await QuestionModel.findAll({
		raw: true,
		order: [['id', 'DESC']]
	});
};

const find = async id => {
	return await QuestionModel.findOne({ where: { id } });
};

module.exports = { store, index, find };
