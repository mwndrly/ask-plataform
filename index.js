const express = require('express');
const app = express();
const database = require('./config/database');
const QuestionModel = require('./models/Question');
const AnswerModel = require('./models/Answer');

const databaseConnection = async () =>{
	try {
		await database.authenticate();
		console.log('Database connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

databaseConnection();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
	QuestionModel.findAll({
		raw: true,
		order: [['id', 'DESC']]
	}).then(questions => {
		res.render('index', { questions	});
	});
});

app.get('/new-question' , (req, res) => {
	res.render('new-question');
});

app.get('/:id', (req, res) => {
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

app.post('/new-question' , (req, res) => {
	QuestionModel.create(req.body).then(() => {
		res.redirect('/');
	});
})

app.post('/answer', (req, res) => {
	AnswerModel.create({
		body: req.body.answer,
		question_id: req.body.question_id
	}).then(() => {
		res.redirect(`/${req.body.question_id}`);
	});
});

app.listen(8080, () => {
	console.log('Server listening on port 8080');
});
