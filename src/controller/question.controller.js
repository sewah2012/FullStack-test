import { Client } from '@elastic/elasticsearch'
// const elasticClient = elastic.Client({
//   host: 'localhost:9200',
// })

const client = new Client({
  cloud: {
    id:
      'fullstack-test:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGU3NzY5ZWJjNmU0ODQwYWI4NmRiZTUxOGU2OGU1NmIxJDhjMmM4Nzg3MTE3MjRlMjhiZGUxM2Y3NzRjZmNjZmM0',
  },
  auth: {
    username: 'elastic',
    password: '2q0N95PoB0516vJ2Q3aWmDGz',
  },
})

const getAllQuestions = (req, res) => {
  // res.json({ message: 'get all questions' })
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

const getSingleQuestion = (req, res) => {
  res.json({ message: 'get single question' })
}
const postQuestion = (req, res) => {
  // res.json({ message: 'post a question' })
  client
    .index({
      index: 'questions',
      body: req.body,
    })
    .then((question) => {
      return res.status(200).json({ msg: 'question indexed', question })
    })
    .catch((err) => {
      return res.status(500).json({
        msg: 'Error',
        err,
      })
    })
}
const postResponse = (req, res) => {
  res.json({ message: 'post response to a question' })
}

export default {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  postResponse,
}
