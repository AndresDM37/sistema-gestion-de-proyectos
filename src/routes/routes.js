import { Router } from 'express'
import { LoginController } from '../controllers/loginController.js'

export const loginRoutes = Router()

loginRoutes.get('/', LoginController.login)
loginRoutes.get('/login', LoginController.login)
loginRoutes.get('/register', LoginController.register)
loginRoutes.get('/home', LoginController.home)
loginRoutes.post('/register', LoginController.registerPost)

