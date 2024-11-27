"use client";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const response = await fetch("/api/scores");
      const data = await response.json();
      setScores(data);
    };
    fetchScores();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.category}</td>
              <td>{entry.score}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

