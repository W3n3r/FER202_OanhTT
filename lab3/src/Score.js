import React from 'react';

const Score = ({ score }) => {
  return (
    <div className="result-box">
      <h1>Quiz Ended</h1>
      <h2>Your Score: {score}</h2>
      <button onClick={() => window.location.reload()}>Replay</button>
    </div>
  );
};
export default Score;