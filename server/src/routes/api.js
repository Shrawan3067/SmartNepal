import express from 'express'
import authRoutes from './authRoutes.js'
import bookingRoutes from './bookingRoutes.js'
import paymentRoutes from './paymentRoutes.js'
import hotelRoutes from './hotelRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use(bookingRoutes) // Mounts at root /api/
router.use('/payments', paymentRoutes)
router.use('/hotels', hotelRoutes)

export default router