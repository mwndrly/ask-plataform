const { Router } = require('express');
const route = Router();
const QuestionModel = require('./models/Question');
const AnswerModel = require('./models/Answer');

route.get('/', (req, res) => {
	QuestionModel.findAll({
		raw: true,
		order: [['id', 'DESC']]
	}).then(questions => {
		res.render('index', { questions	});
	});
});

route.get('/new-question' , (req, res) => {
	res.render('new-question');
});

route.get('/:id', (req, res) => {
	const id = req.params.id;

	QuestionModel.findOne({
		where: { id }
	}).then(question => {
		if (question) {
			AnswerModel.findAll({
				where: {
					question_id: id
				},
				raw: true,
				order: [['id', 'DESC']]
			}).then(answers => {
				res.render('question', { question, answers });
			});
		} else {
			res.redirect('/');
		}
	});
});

route.post('/new-question' , (req, res) => {
	QuestionModel.create(req.body).then(() => {
		res.redirect('/');
	});
})

route.post('/answer', (req, res) => {
	AnswerModel.create({
		body: req.body.answer,
		question_id: req.body.question_id
	}).then(() => {
		res.redirect(`/${req.body.question_id}`);
	});
});

module.exports = route;