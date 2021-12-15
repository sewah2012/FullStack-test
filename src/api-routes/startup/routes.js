import express from 'express'
import session from 'express-session'
import Keycloak from 'keycloak-connect'
// import { initKeycloak, getKeycloak } from '../../config/keycloack'
import bodyParser from 'body-parser'
import authRouter from '../routes/auth'
import questionRouter from '../routes/question'

const memoryStore = new session.MemoryStore()
const keycloak = new Keycloak({ store: memoryStore })

export default (app) => {
  app.use(express.json())
  app.use(bodyParser.json())
  app.use(
    session({
      secret: '404d51e7-3c06-49ea-ab18-77e6d3b3b444',
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  )
  app.use(
    keycloak.middleware({
      logout: '/logout',
      admin: '/',
    })
  )

  app.get('/', (req, res) =>
    res.json({ message: 'Youre hitting the / route.' })
  )
  app.use('/auth', authRouter)
  app.use('/question', questionRouter)
}

// keycloak.protect('user')
