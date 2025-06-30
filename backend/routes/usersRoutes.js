import express from 'express'
import { loginUser, signUpUser } from '../controllers/usersControllers.js'

const router = express.Router()


//need to set up the different routes

//login route
router.post('/login', loginUser)

//sign up route
router.post('/signup', signUpUser)

export default router