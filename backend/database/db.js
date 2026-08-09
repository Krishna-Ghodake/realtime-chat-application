const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "chat.db");

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error("Database connection failed:", error.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (error) => {
  if (error) {
    console.error("Error creating messages table:", error.message);
  } else {
    console.log("Messages table is ready");
  }
});

module.exports = db;