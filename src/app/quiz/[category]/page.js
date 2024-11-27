"use client";

import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import Timer from "@/components/Timer";

export default function QuizPage({ params }) {
  const { category } = params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  const difficulty = new URLSearchParams(window.location.search).get("difficulty");

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      setQuestions(data.results || []);
      setLoading(false);
    };
    fetchQuestions();
  }, [category, difficulty]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (loading) return <Spinner />;

  if (isFinished) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <p>Your score: {score} / {questions.length}</p>
        <div className="mt-4 flex gap-4">
          <button
            className="btn btn-primary"
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setIsFinished(false);
            }}
          >
            Retry Quiz
          </button>
          <a href="/" className="btn btn-secondary">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      <Timer duration={60} onFinish={() => setIsFinished(true)} />
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-lg font-semibold">{currentQuestion.question}</h2>
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
                {answer}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
