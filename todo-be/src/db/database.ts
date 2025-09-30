import sqlite3 from 'sqlite3';
import path from 'path';

// Enable verbose mode for better debugging
const sqlite = sqlite3.verbose();

// Database file path
const dbPath = path.join(__dirname, '../../todos.db');

// Initialize database
const db = new sqlite.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert sample data if table is empty
  db.get("SELECT COUNT(*) as count FROM todos", (err: Error | null, row: any) => {
    if (err) {
      console.error('Error checking todos count:', err.message);
    } else if (row.count === 0) {
      console.log('Inserting sample todos...');
      const insertStmt = db.prepare(`INSERT INTO todos (text, completed) VALUES (?, ?)`);
      insertStmt.run('Sample todo item', 0);
      insertStmt.run('Another todo item', 1);
      insertStmt.finalize();
    }
  });
});

export default db;
