import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function MoodCheck() {
  const [mood, setMood] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!mood) return alert("Please select a mood!");
    try {
      await addDoc(collection(db, "moods"), {
        mood: mood,
        createdAt: Timestamp.now(),
      });
      navigate("/resources", { state: { mood } });
    } catch (error) {
      console.error("Error saving mood:", error);
      alert("Failed to save mood");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>How are you feeling today?</h2>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setMood("Happy")} style={{ margin: "5px" }}>
          😊 Happy
        </button>
        <button onClick={() => setMood("Sad")} style={{ margin: "5px" }}>
          😔 Sad
        </button>
        <button onClick={() => setMood("Stressed")} style={{ margin: "5px" }}>
          😣 Stressed
        </button>
        <button onClick={() => setMood("Okay")} style={{ margin: "5px" }}>
          😐 Okay
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
}

export default MoodCheck;
