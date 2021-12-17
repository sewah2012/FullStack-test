import elasticSearch from '../../config/elasticSearch'
import Question from '../models/question'

const client = elasticSearch.client
elasticSearch.pingEsClient(client)

const getAllQuestions = (req, res) => {
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

const getAllByLocation = (req, res) => {
  const lat = req.query.lat
  const lon = req.query.lon
  client
    .search({
      index: 'questions',
      body: {
        query: {
          match_all: {},
        },
        sort: [
          {
            _geo_distance: {
              location: {
                lat: lat,
                lon: lon,
              },
              order: 'asc',
              mode: 'min',
              unit: 'km',
              distance_type: 'arc',
            },
          },
        ],
      },
    })
    .then((response) => {
      return res.json({ results: response.body.hits.hits })
    })
    .catch((err) => {
      return res.status(500).json({ message: 'Error' })
    })
}

const getSingleQuestion = (req, res) => {
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

  Question.create(quest, (err, q) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error',
        err,
      })
    }

    //indexed le question apres le sauvagarder dans mongoDB
    client
      .index({
        index: 'questions',
        id: q._id.toString(),
        body: quest,
      })
      .then((question) => {
        return res.status(200).json({
          msg: 'question indexed and saved',
          results: question.body.result,
        })
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
    { $push: { response: response } },
    (error, success) => {
      if (!error) {
        //To DO//
        //update index of elastic search
        const quest = {
          title: success.title,
          content: success.content,
          ownerId: success.ownerId,
          response: success.response,
          location: success.location,
        }

        // update the index of this question in elastic search
        client
          .index({
            index: 'questions',
            id: questionId,
            body: quest,
          })
          .then((question) => {
            return res.status(200).json({
              msg: 'Response successfully added and indexed',
              data: question.body.result,
            })
          })
          .catch((err) => {
            return res.status(500).json({
              msg: 'Error',
              err,
            })
          })
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
  getAllByLocation,
  getSingleQuestion,
  postQuestion,
  postResponse,
  researchQuestion,
}
