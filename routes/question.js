const { Router } = require('express');
const route = Router();
const QuestionController = require('../controllers/question');

route.get('/', QuestionController.index);
route.get('/ask', QuestionController.render);
route.post('/', QuestionController.store);

module.exports = route;
