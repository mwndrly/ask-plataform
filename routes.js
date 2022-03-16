const { Router } = require('express');
const route = Router();
const QuestionRoutes = require('./routes/question');
const AnswerRoutes = require('./routes/answer');

route.use('/question', QuestionRoutes);
route.use('/answer', AnswerRoutes);

module.exports = route;
