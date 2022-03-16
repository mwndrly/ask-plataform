const QuestionService = require('../services/question');

const store = async (req, res) => {
	try {
		const questions = await QuestionService.store(req.body);

		res.render('index', { questions });
	} catch (error) {
		console.log('Oh no, something went wrong!', error);
		return res.status(400);
	}
};

const index = async (req, res) => {
	try {
		const questions = await QuestionService.index();

		res.render('index', { questions	});
	} catch (error) {
		console.log('Oh no, something went wrong!', error);
		return res.status(400);
	}
};

const render = (req, res) => {
	res.render('new-question');
};

module.exports = { store, index, render };
