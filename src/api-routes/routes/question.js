import express from 'express'

import questionController from '../../controller/question.controller'

const questionRouter = express.Router()

questionRouter.get('/all', questionController.getAllQuestions)
questionRouter.get(
  '/question/:questionId',
  questionController.getSingleQuestion,
)
questionRouter.post('/response/:questionId', questionController.postResponse)
questionRouter.post('/post', questionController.postQuestion)
questionRouter.get('/research', questionController.researchQuestion)

export default questionRouter
