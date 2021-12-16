import express from 'express'
import session from 'express-session'
import Keycloak from 'keycloak-connect'
import bodyParser from 'body-parser'
import dotEnv from '../../../config/dotEnv'
import authRouter from '../routes/auth'
import questionRouter from '../routes/question'

const memoryStore = new session.MemoryStore()
const keycloak = new Keycloak({ store: memoryStore })

export default (app) => {
  app.use(express.json())
  app.use(bodyParser.json())
  app.use(
    session({
      secret: dotEnv.Kc_secret_key,
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    }),
  )
  app.use(
    keycloak.middleware({
      logout: '/logout',
      admin: '/',
    }),
  )

  app.get('/', (req, res) =>
    res.json({ message: 'Youre hitting the / route.' }),
  )
  app.use('/auth', authRouter)
  app.use('/question', questionRouter)
}

// keycloak.protect('user')
