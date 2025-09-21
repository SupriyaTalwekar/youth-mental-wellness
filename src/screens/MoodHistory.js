import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

function MoodHistory() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      const q = query(collection(db, "moods"), orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        mood: doc.data().mood,
        createdAt: doc.data().createdAt.toDate().toLocaleString(),
      }));
      setMoodData(data);
    };
    fetchMoods();
  }, []);

  const moodMap = { Happy: 4, Okay: 3, Stressed: 2, Sad: 1 };
  const chartData = moodData.map((m) => ({
    name: m.createdAt.split(",")[0],
    moodValue: moodMap[m.mood] || 0,
  }));

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Your Mood History</h2>
      <div style={{ width: "90%", height: 300, margin: "auto" }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Line type="monotone" dataKey="moodValue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
}

export default MoodHistory;
