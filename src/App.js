import React, { useState } from "react";

function App() {
  const [page, setPage] = useState("chat"); // chat, history, tips
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to send message to backend AI
  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: "You", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setChatHistory((prev) => [...prev, { sender: "AI", text: data.reply }]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "AI", text: "❌ Failed to get AI response" },
      ]);
    } finally {
      setUserMessage("");
      setLoading(false);
    }
  };

  // Record mood with timestamp
  const recordMood = (mood) => {
    setMoodHistory([
      { mood, time: new Date().toLocaleString() },
      ...moodHistory,
    ]);
  };

  return (
    <div
      style={{ fontFamily: "Arial", minHeight: "100vh", background: "#f2f6ff" }}
    >
      {/* Navigation Tabs */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-around",
          background: "#2c3e50",
          padding: 10,
        }}
      >
        {["chat", "history", "tips"].map((p) => (
          <button
            key={p}
            style={{
              background: page === p ? "#3498db" : "transparent",
              color: "white",
              border: "none",
              padding: "5px 15px",
              borderRadius: 20,
              cursor: "pointer",
            }}
            onClick={() => setPage(p)}
          >
            {p === "chat"
              ? "Chat"
              : p === "history"
              ? "Mood History"
              : "AI Tips"}
          </button>
        ))}
      </nav>

      {/* Chat Page */}
      {page === "chat" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
            height: "85vh",
          }}
        >
          {/* Mood Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {["😊 Happy", "😢 Sad", "😓 Stressed", "😐 Okay"].map((m) => (
              <button
                key={m}
                onClick={() => recordMood(m)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 15,
                  border: "none",
                  cursor: "pointer",
                  background: "#eee",
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Chat History */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: 10,
              overflowY: "auto",
              background: "#fff",
              borderRadius: 10,
            }}
          >
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "You" ? "#413d95ff" : "#e0e0e0",
                  color: msg.sender === "You" ? "white" : "black",
                  padding: "8px 12px",
                  borderRadius: 15,
                  maxWidth: "70%",
                }}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div style={{ display: "flex", marginTop: 10 }}>
            <input
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 20,
                border: "1px solid #ccc",
              }}
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              style={{
                marginLeft: 10,
                padding: "10px 20px",
                borderRadius: 20,
                border: "none",
                background: "#472c75ff",
                color: "white",
                cursor: "pointer",
              }}
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}

      {/* Mood History Page */}
      {page === "history" && (
        <div style={{ padding: 20 }}>
          <h2>Your Mood History</h2>
          {moodHistory.length === 0 ? (
            <p>No moods recorded yet.</p>
          ) : (
            <ul>
              {moodHistory.map((m, i) => (
                <li key={i}>
                  {m.mood} — <span style={{ color: "gray" }}>{m.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* AI Tips Page */}
      {page === "tips" && (
        <div style={{ padding: 20 }}>
          <h2>AI Wellness Tips 💡</h2>
          <p>• Take deep breaths when stressed.</p>
          <p>• Sleep 7–8 hours daily.</p>
          <p>• Exercise 20 mins every day.</p>
          <p>• Talk to a friend when feeling low.</p>
          <p>• Practice gratitude daily.</p>
        </div>
      )}
    </div>
  );
}

export default App;
