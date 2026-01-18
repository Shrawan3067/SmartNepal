import pool from '../config/database.js'

class Hotel {
  static async search({ location, checkIn, checkOut, guests = 1 }) {
    const [rows] = await pool.execute(
      `SELECT * FROM hotels 
       WHERE location LIKE ? 
       AND available_rooms >= ?
       ORDER BY rating DESC`,
      [`%${location}%`, guests]
    )
    return rows
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT h.*, 
              (SELECT JSON_ARRAYAGG(url) FROM hotel_images WHERE hotel_id = h.id) as images
       FROM hotels h
       WHERE h.id = ?`,
      [id]
    )
    return rows[0]
  }

  static async updateAvailability(id, roomsBooked) {
    await pool.execute(
      'UPDATE hotels SET available_rooms = available_rooms - ? WHERE id = ?',
      [roomsBooked, id]
    )
  }
}

export default Hotel