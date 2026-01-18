import Payment from '../models/Payment.js'
import Booking from '../models/Booking.js'

export const processPayment = async (req, res) => {
  try {
    const { bookingId, amount, method, transactionId } = req.body
    
    // Verify booking exists and belongs to user
    const booking = await Booking.findById(bookingId)
    if (!booking || booking.user_id !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }
    
    // Verify amount matches
    if (parseFloat(booking.total_amount) !== parseFloat(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Amount mismatch'
      })
    }
    
    // Create payment record
    const paymentId = await Payment.create({
      bookingId,
      amount,
      method,
      transactionId,
      status: 'completed'
    })
    
    // Update booking status
    await Booking.updateStatus(bookingId, 'paid')
    
    res.json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        paymentId,
        transactionId,
        status: 'completed'
      }
    })
  } catch (error) {
    console.error('Payment error:', error)
    res.status(500).json({
      success: false,
      message: 'Error processing payment'
    })
  }
}

export const verifyPayment = async (req, res) => {
  try {
    const { transactionId } = req.params
    
    // In a real app, this would verify with payment gateway
    // For now, we'll just check our database
    
    // Simulate verification
    const paymentVerified = true // This would be from payment gateway
    
    if (paymentVerified) {
      await Payment.updateStatus(transactionId, 'completed')
      
      res.json({
        success: true,
        message: 'Payment verified successfully',
        data: { status: 'completed' }
      })
    } else {
      await Payment.updateStatus(transactionId, 'failed')
      
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      })
    }
  } catch (error) {
    console.error('Verify payment error:', error)
    res.status(500).json({
      success: false,
      message: 'Error verifying payment'
    })
  }
}