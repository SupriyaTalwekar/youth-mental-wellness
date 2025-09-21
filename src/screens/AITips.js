import React, { useState, useRef, useEffect } from "react";

function AITips() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    let aiResponse = "";
    const text = input.toLowerCase();
    if (text.includes("sad") || text.includes("demotivated")) {
      aiResponse = "Do something you enjoy today 🌼";
    } else if (text.includes("happy") || text.includes("good")) {
      aiResponse = "That's great! Keep smiling 😄";
    } else {
      aiResponse = "Check in with a friend.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        AI Tips Chat
      </h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          height: "400px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: m.sender === "ai" ? "flex-start" : "flex-end",
              backgroundColor: m.sender === "ai" ? "#e2f0d9" : "#cce5ff",
              color: "#000",
              padding: "10px 15px",
              borderRadius: "20px",
              margin: "5px 0",
              maxWidth: "75%",
            }}
          >
            <b>{m.sender === "ai" ? "AI" : "You"}:</b> {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            borderRadius: "20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AITips;
