import Hotel from '../models/Hotel.js'

export const searchHotels = async (req, res) => {
  try {
    const { location, checkIn, checkOut, guests } = req.query
    
    const hotels = await Hotel.search({
      location,
      checkIn,
      checkOut,
      guests: parseInt(guests) || 1
    })
    
    res.json({
      success: true,
      data: hotels,
      count: hotels.length
    })
  } catch (error) {
    console.error('Hotel search error:', error)
    res.status(500).json({
      success: false,
      message: 'Error searching hotels'
    })
  }
}

export const getHotelDetails = async (req, res) => {
  try {
    const { id } = req.params
    const hotel = await Hotel.findById(id)
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      })
    }
    
    res.json({
      success: true,
      data: hotel
    })
  } catch (error) {
    console.error('Hotel details error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching hotel details'
    })
  }
}