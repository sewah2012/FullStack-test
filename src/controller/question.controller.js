import client from '../../config/elasticSearch'
import Question from '../models/question'

const getAllQuestions = (req, res) => {
  // res.json({ message: 'list of all questions questions' })

  Question.find()
    .exec()
    .then((resp) => res.status(200).json(resp))
    .catch((err) => {
      return res.status(500).json({
        msg: 'Error',
        err,
      })
    })
}

const getSingleQuestion = (req, res) => {
  // res.json({ message: 'get single question' })

  const questioniId = req.params.questionId

  Question.findById(questioniId)
    .exec()
    .then((resp) => res.status(200).json(resp))
    .catch((err) => {
      return res.status(500).json({
        msg: 'Error',
        err,
      })
    })
}

const postQuestion = (req, res) => {
  const quest = {
    title: req.body.title,
    content: req.body.content,
    ownerId: req.body.ownerId,
    response: req.body.response,
    location: req.body.location,
  }

  Question.create(quest, (err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error',
        err,
      })
    }

    quest.questionId = data._id.toString() // adds document id to the question before indexing it to elastic search
    //indexed le question apres le sauvagarder dans mongoDB

    client
      .index({
        index: 'questions',
        body: quest,
      })
      .then((question) => {
        return res
          .status(200)
          .json({ msg: 'question indexed and saved', question })
      })
      .catch((err) => {
        return res.status(500).json({
          msg: 'Error',
          err,
        })
      })
  })
}

const postResponse = (req, res) => {
  const questionId = req.params.questionId
  const response = { response: req.body.response, author: req.body.author }

  Question.findOneAndUpdate(
    { _id: questionId },
    { $push: { reponse: response } },
    (error, success) => {
      if (!error) {
        return res.status(200).json({ msg: 'Response added successfully!' })
      } else {
        console.log(error)
      }
    },
  )
}

//research une question en utilison elastic search
const researchQuestion = (req, res) => {
  const q = req.query.search

  const query = {
    index: 'questions',
  }

  if (q) query.q = `*${q}*`

  client
    .search(query)
    .then((resp) => {
      return res.status(200).json({
        questions: resp.body.hits.hits,
      })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ msg: 'Error', err })
    })
}

export default {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  postResponse,
  researchQuestion,
}
