import express from 'express'
import {
  searchBuses,
  getBusDetails,
  createBooking,
  getBooking,
  getUserBookings
} from '../controllers/bookingController.js'
import { authenticate } from '../middleware/auth.js'
import { validate, bookingValidation } from '../middleware/validation.js'

const router = express.Router()

router.get('/buses/search', searchBuses)
router.get('/buses/:id', getBusDetails)

router.use(authenticate) // All routes below require authentication

router.post('/bookings', validate(bookingValidation), createBooking)
router.get('/bookings/:id', getBooking)
router.get('/bookings', getUserBookings)

export default router