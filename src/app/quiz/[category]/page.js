"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import Timer from "@/components/Timer";
import he from "he";

export default function QuizPage({ params }) {
  const { category = '' } = params;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setDifficulty(urlParams.get("difficulty"));
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        if (!data.results || data.results.length === 0) {
          throw new Error('No questions available');
        }
        setQuestions(data.results);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (difficulty) {
      fetchQuestions();
    }
  }, [category, difficulty]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setError(null);
    fetchQuestions();
  };

  const saveScore = async () => {
    const username = prompt("Enter your name for the leaderboard:");
    if (!username) return;

    // Fetch category name
    const categoryResponse = await fetch(`https://opentdb.com/api_category.php`);
    const categoryData = await categoryResponse.json();
    const categoryName = categoryData.trivia_categories.find(cat => cat.id === parseInt(category)).name;

    await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        category: categoryName,
        score,
      }),
    });
  };

  const handleFinish = () => {
    saveScore();
    setIsFinished(true);
  };

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="mb-4">{error}</p>
        <button 
          className="btn btn-primary"
          onClick={handleRetry}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <p>Your score: {score} / {questions.length}</p>
        <div className="mt-4 flex gap-4">
          <button
            className="btn btn-primary"
            onClick={handleRetry}
          >
            Retry Quiz
          </button>
          <Link href="/" className="btn btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>No question available</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      <Timer duration={60} onFinish={handleFinish} />
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-lg font-semibold">{he.decode(currentQuestion.question)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {[
            ...currentQuestion.incorrect_answers,
            currentQuestion.correct_answer,
          ]
            .sort(() => Math.random() - 0.5)
            .map((answer) => (
              <button
                key={answer}
                className="btn btn-outline btn-primary"
                onClick={() =>
                  handleAnswer(answer === currentQuestion.correct_answer)
                }
              >
                {he.decode(answer)}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}