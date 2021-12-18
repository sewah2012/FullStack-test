import elasticSearch from '../../config/elasticSearch'
import Like from '../models/Like'
import Question from '../models/question'
import utility from '../utility/utility'

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
    { new: true },
    (error, doc) => {
      if (!error) {
        //To DO//
        //update index of elastic search
        const quest = {
          title: doc.title,
          content: doc.content,
          ownerId: doc.ownerId,
          response: doc.response,
          location: doc.location,
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

const likeQuestion = async (req, res) => {
  const data = {
    _id: req.body._id,
    userId: req.body.userId,
    likes: req.body.likedQuestion,
  }

  const found = await utility.isExisting(data._id)
  if (found) {
    // const isQuestionLiked = found.likes._id

    // {"where":{"arrayAttribute":{ "all" :[String]}}}

    // const result = await Like.find(found.likes)
    found.likes.forEach((like) => {
      if (like._id === data.likes._id) {
        return res.json({ msg: 'Question already liked' })
      }
    })
    const result = await Like.findOneAndUpdate(
      { _id: found._id },
      { $push: { likes: data.likes } },
      { new: true },
    )

    res
      .status(200)
      .json({ msg: 'Successfully aded to you favorites', updated: result })
  } else {
    Like.create(data, (err, q) => {
      if (err) {
        return res.status(500).json({
          msg: 'Error',
          err,
        })
      }

      res.json({ msg: q })
    })
  }
}

const unLikeQuestion = async (req, res) => {
  const found = await utility.isExisting(req.query.userId)
  if (found) {
    const result = await Like.update(
      { _id: found._id },
      {
        $pull: {
          likes: { _id: req.query.questionId },
        },
      },
      { safe: true },
    )

    res.status(200).json({
      msg: 'Successfully removed question from your favorites',
      updated: result,
    })
  } else {
    res.json({
      msg: 'You need to like this question first before unliking it.',
    })
  }
}

const getUsersLikes = async (req, res) => {
  const userId = req.query.userId

  const likes = await utility.isExisting(userId)

  if (!likes) res.json({ likes: [] })

  res.json(likes)
}

export default {
  getAllQuestions,
  getAllByLocation,
  getSingleQuestion,
  postQuestion,
  postResponse,
  researchQuestion,
  likeQuestion,
  unLikeQuestion,
  getUsersLikes,
}
