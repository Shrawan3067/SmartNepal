import pool from '../config/database.js'

class Booking {
  static async create({ userId, busId, seats, totalAmount, status = 'confirmed' }) {
    const [result] = await pool.execute(
      'INSERT INTO bookings (user_id, bus_id, seats, total_amount, status) VALUES (?, ?, ?, ?, ?)',
      [userId, busId, JSON.stringify(seats), totalAmount, status]
    )
    return result.insertId
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT b.*, u.name as user_name, u.email as user_email,
              bs.name as bus_name, bs.from_location, bs.to_location,
              bs.departure_time, bs.arrival_time
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN buses bs ON b.bus_id = bs.id
       WHERE b.id = ?`,
      [id]
    )
    return rows[0]
  }

  static async findByUser(userId) {
    const [rows] = await pool.execute(
      `SELECT b.*, bs.name as bus_name
       FROM bookings b
       JOIN buses bs ON b.bus_id = bs.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [userId]
    )
    return rows
  }

  static async updateStatus(id, status) {
    await pool.execute(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, id]
    )
  }
}

export default Booking