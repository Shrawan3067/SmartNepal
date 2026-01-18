import { useBooking } from '../context/BookingContext'

export const useBookingHook = () => {
  return useBooking()
}