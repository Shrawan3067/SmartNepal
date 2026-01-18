import { createContext, useState, useContext } from 'react'

const BookingContext = createContext()

export const useBooking = () => useContext(BookingContext)

export const BookingProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  })
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookingDetails, setBookingDetails] = useState(null)
  const [paymentDetails, setPaymentDetails] = useState(null)

  const updateSearchData = (data) => {
    setSearchData(prev => ({ ...prev, ...data }))
  }

  const selectSeat = (seatId) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId)
      } else {
        return [...prev, seatId]
      }
    })
  }

  const createBooking = (busDetails) => {
    const booking = {
      id: Date.now(),
      bus: busDetails,
      seats: selectedSeats,
      searchData,
      totalAmount: selectedSeats.length * busDetails.price,
      createdAt: new Date().toISOString()
    }
    setBookingDetails(booking)
    return booking
  }

  const completePayment = (paymentData) => {
    const payment = {
      ...paymentData,
      bookingId: bookingDetails?.id,
      status: 'completed',
      paidAt: new Date().toISOString()
    }
    setPaymentDetails(payment)
    return payment
  }

  const resetBooking = () => {
    setSearchData({
      from: '',
      to: '',
      date: '',
      passengers: 1
    })
    setSelectedSeats([])
    setBookingDetails(null)
    setPaymentDetails(null)
  }

  return (
    <BookingContext.Provider value={{
      searchData,
      selectedSeats,
      bookingDetails,
      paymentDetails,
      updateSearchData,
      selectSeat,
      createBooking,
      completePayment,
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  )
}