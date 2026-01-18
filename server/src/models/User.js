import pool from '../config/database.js'

class User {
  static async create({ name, email, password, phone = null }) {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, password, phone]
    )
    return result.insertId
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    return rows[0]
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, phone, created_at FROM users WHERE id = ?',
      [id]
    )
    return rows[0]
  }

  static async update(id, updates) {
    const fields = []
    const values = []
    
    Object.keys(updates).forEach(key => {
      fields.push(`${key} = ?`)
      values.push(updates[key])
    })
    
    values.push(id)
    
    await pool.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    )
  }
}

export default User