import React from 'react';

const Question = ({ data, onAnswer, questionNumber }) => {
  return (
    <div className="question-box">
      <h2>Question {questionNumber}</h2>
      <p>{data.question}</p>
      {data.options.map((option) => (
        <button key={option} className="option-button" onClick={() => onAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};
export default Question;