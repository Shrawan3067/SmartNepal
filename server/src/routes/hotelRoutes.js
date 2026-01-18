import express from 'express'
import {
  searchHotels,
  getHotelDetails
} from '../controllers/hotelController.js'

const router = express.Router()

router.get('/hotels/search', searchHotels)
router.get('/hotels/:id', getHotelDetails)

export default router