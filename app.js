import routes from './src/api-routes/startup/routes'
import express from 'express'
import mongoose from 'mongoose'
import dotEnv from './config/dotEnv'
var cors = require('cors')

const app = express()
app.use(cors())
const PORT = dotEnv.node_server_port || 8090

mongoose.connect(dotEnv.mongodb_ur, {})

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
