const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Real-Time Chat API is running",
  });
});

app.post("/api/messages", (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({
      error: "Username and message are required",
    });
  }

  const query = `
    INSERT INTO messages (username, message)
    VALUES (?, ?)
  `;

  db.run(query, [username, message], function (error) {
    if (error) {
      console.error("Error saving message:", error.message);

      return res.status(500).json({
        error: "Failed to save message",
      });
    }

    res.status(201).json({
      id: this.lastID,
      username,
      message,
    });
  });
});

app.get("/api/messages", (req, res) => {
  const query = `
    SELECT id, username, message, timestamp
    FROM messages
    ORDER BY timestamp ASC
  `;

  db.all(query, [], (error, rows) => {
    if (error) {
      console.error("Error fetching messages:", error.message);

      return res.status(500).json({
        error: "Failed to fetch messages",
      });
    }

    res.json(rows);
  });
});

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (message) => {
    io.emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});