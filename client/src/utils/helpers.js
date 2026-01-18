export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 0
  }).format(amount)
}

export const generateSeatLayout = (rows = 10, cols = 4) => {
  const seats = []
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const seatId = `${row}${String.fromCharCode(64 + col)}`
      seats.push({
        id: seatId,
        row,
        col,
        isBooked: Math.random() > 0.8,
        isWindow: col === 1 || col === cols,
        price: 1500
      })
    }
  }
  return seats
}

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}