import fs from 'fs'
import path from 'path'
import pool from '../../src/config/database.js'

async function runMigrations() {
  try {
    const schemaPath = path.join(process.cwd(), 'database', 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    const connection = await pool.getConnection()
    
    // Split SQL statements
    const statements = schema.split(';').filter(statement => statement.trim())
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement)
      }
    }
    
    connection.release()
    console.log('✅ Database schema created successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration error:', error)
    process.exit(1)
  }
}

runMigrations()