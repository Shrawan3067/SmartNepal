import { useState } from 'react'
import { generateSeatLayout } from '../../utils/helpers'
import { useBooking } from '../../context/BookingContext'

const SeatSelection = () => {
  const { selectedSeats, selectSeat } = useBooking()
  const [seats] = useState(generateSeatLayout())

  const handleSeatClick = (seat) => {
    if (!seat.isBooked) {
      selectSeat(seat.id)
    }
  }

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-6">Select Seats</h3>
      
      <div className="mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded mr-2"></div>
          <span className="mr-4">Available</span>
          
          <div className="w-8 h-8 bg-blue-600 rounded mr-2"></div>
          <span className="mr-4">Selected</span>
          
          <div className="w-8 h-8 bg-gray-600 rounded mr-2"></div>
          <span>Booked</span>
        </div>
        
        <div className="mb-4 flex justify-center">
          <div className="w-64 h-10 bg-yellow-500 flex items-center justify-center">
            <span className="text-white font-bold">Driver</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {seats.map(seat => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.isBooked}
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center font-bold
                ${seat.isBooked 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : selectedSeats.includes(seat.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
                }
              `}
            >
              {seat.id}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="font-bold mb-2">Selected Seats: {selectedSeats.join(', ') || 'None'}</h4>
        <p className="text-gray-600">Price per seat: Rs. 1500</p>
        <p className="text-lg font-bold mt-2">Total: Rs. {selectedSeats.length * 1500}</p>
      </div>
    </div>
  )
}

export default SeatSelection