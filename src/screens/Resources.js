import React from "react";
import { useLocation, Link } from "react-router-dom";

function Resources() {
  const location = useLocation();
  const mood = location.state?.mood || "Unknown";

  const suggestions = {
    Happy: "Keep spreading positivity! 🌟",
    Sad: "It’s okay to feel sad. Try talking to a friend 💙",
    Stressed: "Take deep breaths. Try meditation 🧘",
    Okay: "Do something enjoyable today 🌼",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Your Mood: {mood}</h2>
      <p>{suggestions[mood]}</p>
      <Link to="/mood">
        <button>Check Again</button>
      </Link>
      <Link to="/ai-tips" state={{ mood }}>
        <button style={{ marginLeft: "10px" }}>Get AI Tips</button>
      </Link>
      <Link to="/history">
        <button style={{ marginLeft: "10px" }}>View Mood History</button>
      </Link>
    </div>
  );
}

export default Resources;
