import express from 'express'
import auth from '../../controller/auth.controller'

const authRouter = express.Router()

authRouter.get('/login', auth.loginController)
authRouter.post('/signup', auth.signupController)

export default authRouter
