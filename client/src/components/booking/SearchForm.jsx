import { useState } from 'react'
import { useBooking } from '../../context/BookingContext'
import { CITIES } from '../../utils/constants'
import Button from '../ui/Button'
import Input from '../ui/Input'

const SearchForm = () => {
  const { searchData, updateSearchData } = useBooking()
  const [localData, setLocalData] = useState(searchData)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSearchData(localData)
    // In a real app, this would navigate to search results
    window.location.href = '/search?q=bus'
  }

  const handleChange = (e) => {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <select
            name="from"
            value={localData.from}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          >
            <option value="">Select City</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <select
            name="to"
            value={localData.to}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          >
            <option value="">Select City</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <Input
            type="date"
            name="date"
            value={localData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passengers
          </label>
          <Input
            type="number"
            name="passengers"
            value={localData.passengers}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        className="w-full mt-6"
      >
        Search Buses
      </Button>
    </form>
  )
}

export default SearchForm