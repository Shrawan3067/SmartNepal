import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth APIs
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  signup: (userData) => API.post('/auth/signup', userData),
  logout: () => API.post('/auth/logout'),
}

// Booking APIs
export const bookingAPI = {
  searchBuses: (params) => API.get('/buses/search', { params }),
  getBusDetails: (id) => API.get(`/buses/${id}`),
  createBooking: (data) => API.post('/bookings', data),
  getBooking: (id) => API.get(`/bookings/${id}`),
}

// Payment APIs
export const paymentAPI = {
  processPayment: (data) => API.post('/payments/process', data),
  verifyPayment: (transactionId) => API.get(`/payments/verify/${transactionId}`),
}

// Hotel APIs
export const hotelAPI = {
  searchHotels: (params) => API.get('/hotels/search', { params }),
  getHotelDetails: (id) => API.get(`/hotels/${id}`),
}

export default API