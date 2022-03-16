const AnswerModel = require('../models/Answer');
const QuestionService = require('./question');

const store = async data => {
    await AnswerModel.create(data);

    return await index(data.question_id);
};

const index = async questionId => {
    const question = await QuestionService.find(questionId);

    const answers = await AnswerModel.findAll({
        where: {
            question_id: questionId
        },
        raw: true,
        order: [['id', 'DESC']]
    });

    return { question, answers };
};

module.exports = { store, index };
