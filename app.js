import routes from './src/api-routes/startup/routes'
import express from 'express'
import mongoose from 'mongoose'

import Question from './src/models/question'

const app = express()

const PORT = process.env.PORT || 8090

mongoose.connect(process.env.MONGODB_URL, {})

mongoose.set('debug', true)

routes(app)

app.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  }
  {
    console.log(`APP Listen to port : ${PORT}`)
  }
})

// Question.create({
//   title: 'question 1',
//   content: 'question content ',
//   location: {
//     name: 'rabat',
//     longitude: '',
//     latitude: '',
//   },
// })
