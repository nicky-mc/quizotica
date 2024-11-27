"use client";
import { useState, useEffect } from "react";

export default function Timer({ duration, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onFinish]);

  return <p className="text-center text-lg">Time Left: {timeLeft}</p>;
}