import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Youth Mental Wellness </h1>
      <p>Your safe space to check in with yourself.</p>
      <Link to="/mood">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Start Mood Check
        </button>
      </Link>
    </div>
  );
}

export default Home;
