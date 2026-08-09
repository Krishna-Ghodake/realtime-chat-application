import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5001");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    // Fetch previous messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/messages"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Unable to load messages.");
      }
    };

    fetchMessages();

    // Receive new messages in real time
    const handleNewMessage = (newMessage) => {
      setMessages((currentMessages) => {
        const alreadyExists = currentMessages.some(
          (item) => item.id === newMessage.id
        );

        if (alreadyExists) {
          return currentMessages;
        }

        return [...currentMessages, newMessage];
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!username.trim() || !message.trim()) {
      setError("Please enter your name and message.");
      return;
    }

    setError("");

    const newMessage = {
      username: username.trim(),
      message: message.trim(),
    };

    try {
      // Save message using REST API
      const response = await fetch(
        "http://localhost:5001/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const savedMessage = await response.json();

      // Broadcast the saved message through Socket.io
      socket.emit("sendMessage", savedMessage);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Unable to send message.");
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <header className="chat-header">
          <h1>Real-Time Chat</h1>

          <p
            className={`connection-status ${
              isConnected ? "online" : "offline"
            }`}
          >
            <span className="status-dot"></span>
            {isConnected
              ? "Connected with Socket.io"
              : "Disconnected"}
          </p>
        </header>

        <div className="username-section">
          <label htmlFor="username">Your name</label>

          <input
            id="username"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <p className="empty-message">
              No messages yet. Start the conversation.
            </p>
          ) : (
            messages.map((item) => (
              <div
                className="message"
                key={
                  item.id ||
                  `${item.username}-${item.timestamp}-${item.message}`
                }
              >
                <div className="message-header">
                  <strong>{item.username}</strong>
                  <span>{item.timestamp}</span>
                </div>

                <p>{item.message}</p>
              </div>
            ))
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <form className="message-form" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;