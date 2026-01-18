import pool from '../config/database.js'

class Payment {
  static async create({ bookingId, amount, method, transactionId, status = 'pending' }) {
    const [result] = await pool.execute(
      'INSERT INTO payments (booking_id, amount, method, transaction_id, status) VALUES (?, ?, ?, ?, ?)',
      [bookingId, amount, method, transactionId, status]
    )
    return result.insertId
  }

  static async updateStatus(transactionId, status) {
    await pool.execute(
      'UPDATE payments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE transaction_id = ?',
      [status, transactionId]
    )
  }

  static async findByBooking(bookingId) {
    const [rows] = await pool.execute(
      'SELECT * FROM payments WHERE booking_id = ? ORDER BY created_at DESC',
      [bookingId]
    )
    return rows[0]
  }
}

export default Payment