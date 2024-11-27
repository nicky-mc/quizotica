"use client";

import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Leaderboard from "@/components/Leaderboard";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("medium");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data.trivia_categories || []);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-6">
        <Link href="#leaderboard" className="btn btn-secondary">
          View Leaderboard
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-6 text-center">Select a Category</h1>
      <div className="mb-4 text-center">
        <label className="mr-4 font-semibold">Difficulty:</label>
        <select
          className="select select-bordered"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(({ id, name }) => (
          <div key={id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <p>Test your knowledge in {name}!</p>
              <div className="card-actions justify-end">
                <Link href={`/quiz/${id}?difficulty=${difficulty}`} className="btn btn-primary">
                  Start Quiz
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="leaderboard" className="mt-8">
        <Leaderboard />
      </div>
    </div>
  );
}