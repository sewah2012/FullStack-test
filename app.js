import routes from './src/api-routes/startup/routes'
import express from 'express'

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 8090

routes(app)

app.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  }
  {
    console.log(`APP Listen to port : ${PORT}`)
  }
})
