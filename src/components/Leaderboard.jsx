"use client";

import { useState, useEffect } from "react";

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
    <div className="mt-8 container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Category</th>
              <th className="text-left">Score</th>
              <th className="text-left">Date</th>
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
    </div>
  );
}