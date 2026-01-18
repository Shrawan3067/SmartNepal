import express from 'express'
import { register, login, getProfile } from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'
import { validate, registerValidation, loginValidation } from '../middleware/validation.js'

const router = express.Router()

router.post('/register', validate(registerValidation), register)
router.post('/login', validate(loginValidation), login)
router.get('/profile', authenticate, getProfile)

export default router