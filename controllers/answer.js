const AnswerService = require("../services/answer");

const store = async (req, res) => {
	try {
		const data = {
			body: req.body.answer,
			question_id: req.body.question_id
		};

		const { question, answers } = await AnswerService.store(data);

		res.render('question', { question, answers });
	} catch (error) {
		console.log("Oh no, something went wrong!", error);
		return res.status(400);
	}
};

const index = async (req, res) => {
	try {
		const id =  ~~req.params.id;

		const { question, answers } = await AnswerService.index(id);

		res.render('question', { question, answers })
	} catch (error) {
		console.log("Oh no, something went wrong!", error);
		return res.status(400);
	}
};

module.exports = { store, index };
