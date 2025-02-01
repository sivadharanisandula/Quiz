import React, { useState, useEffect } from "react";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetch("https://api.jsonserve.com/Uw5CrX")
      .then((response) => response.json())
      .then((data) => setQuestions(data.questions))
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        {quizCompleted ? (
          <div>
            <h2 className="text-2xl font-bold text-center">Quiz Completed!</h2>
            <p className="text-lg text-center mt-4">Your Score: {score} / {questions.length}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion]?.question}</h2>
            <div className="flex flex-col gap-2">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option.isCorrect)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
