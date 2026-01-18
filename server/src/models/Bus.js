import pool from '../config/database.js'

class Bus {
  static async search({ from, to, date }) {
    const [rows] = await pool.execute(
      `SELECT * FROM buses 
       WHERE from_location LIKE ? 
       AND to_location LIKE ? 
       AND DATE(departure_time) = ?
       AND available_seats > 0
       ORDER BY departure_time`,
      [`%${from}%`, `%${to}%`, date]
    )
    return rows
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM buses WHERE id = ?',
      [id]
    )
    return rows[0]
  }

  static async updateSeats(id, seatsBooked) {
    await pool.execute(
      'UPDATE buses SET available_seats = available_seats - ? WHERE id = ?',
      [seatsBooked, id]
    )
  }

  static async getSeatLayout(id) {
    // This would return the seat layout for a specific bus
    const [rows] = await pool.execute(
      'SELECT seat_layout FROM buses WHERE id = ?',
      [id]
    )
    return rows[0]?.seat_layout ? JSON.parse(rows[0].seat_layout) : null
  }
}

export default Bus