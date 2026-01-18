import Booking from '../models/Booking.js'
import Bus from '../models/Bus.js'
import Payment from '../models/Payment.js'

export const searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query
    
    const buses = await Bus.search({ from, to, date })
    
    res.json({
      success: true,
      data: buses,
      count: buses.length
    })
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({
      success: false,
      message: 'Error searching buses'
    })
  }
}

export const getBusDetails = async (req, res) => {
  try {
    const { id } = req.params
    const bus = await Bus.findById(id)
    
    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      })
    }
    
    const seatLayout = await Bus.getSeatLayout(id)
    
    res.json({
      success: true,
      data: {
        ...bus,
        seatLayout
      }
    })
  } catch (error) {
    console.error('Bus details error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching bus details'
    })
  }
}

export const createBooking = async (req, res) => {
  try {
    const { busId, seats, totalAmount } = req.body
    const userId = req.user.id
    
    // Check bus availability
    const bus = await Bus.findById(busId)
    if (!bus || bus.available_seats < seats.length) {
      return res.status(400).json({
        success: false,
        message: 'Not enough seats available'
      })
    }
    
    // Create booking
    const bookingId = await Booking.create({
      userId,
      busId,
      seats,
      totalAmount
    })
    
    // Update bus seats
    await Bus.updateSeats(busId, seats.length)
    
    // Get booking details
    const booking = await Booking.findById(bookingId)
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    })
  } catch (error) {
    console.error('Booking error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating booking'
    })
  }
}

export const getBooking = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    
    const booking = await Booking.findById(id)
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }
    
    // Check if user owns this booking
    if (booking.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      })
    }
    
    // Get payment details
    const payment = await Payment.findByBooking(id)
    
    res.json({
      success: true,
      data: {
        booking,
        payment
      }
    })
  } catch (error) {
    console.error('Get booking error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching booking'
    })
  }
}

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id
    const bookings = await Booking.findByUser(userId)
    
    res.json({
      success: true,
      data: bookings,
      count: bookings.length
    })
  } catch (error) {
    console.error('User bookings error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching user bookings'
    })
  }
}