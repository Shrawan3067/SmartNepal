import express from 'express'
import {
  processPayment,
  verifyPayment
} from '../controllers/paymentController.js'
import { authenticate } from '../middleware/auth.js'
import { validate, paymentValidation } from '../middleware/validation.js'

const router = express.Router()

router.use(authenticate) // All routes require authentication

router.post('/payments/process', validate(paymentValidation), processPayment)
router.get('/payments/verify/:transactionId', verifyPayment)

export default router