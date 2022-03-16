const { Router } = require('express');
const route = Router();
const AnswerController = require('../controllers/answer');

route.get('/:id', AnswerController.index);
route.post('/', AnswerController.store);

module.exports = route;
