import React, { Component } from 'react';
import Question from './Question';
import Score from './Score';
import './QuizApp.css';

class QuizApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        { id: 1, question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { id: 2, question: "What is the largest planet in our solar system?", options: ["Jupiter", "Saturn", "Mars", "Earth"], answer: "Jupiter" }
      ],
      currentQuestion: 0,
      score: 0,
      quizEnd: false
    };
  }

  handleAnswer = (selectedOption) => {
    const { questions, currentQuestion, score } = this.state;
    // Kiểm tra và cộng điểm [cite: 17, 18, 19]
    if (selectedOption === questions[currentQuestion].answer) {
      this.setState({ score: score + 1 });
    }
    // Chuyển sang câu kế tiếp hoặc kết thúc [cite: 20]
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      this.setState({ currentQuestion: nextQuestion });
    } else {
      this.setState({ quizEnd: true });
    }
  }

  render() {
    const { questions, currentQuestion, score, quizEnd } = this.state;
    return (
      <div className="quiz-container">
        {!quizEnd ? (
          <Question 
            data={questions[currentQuestion]} 
            onAnswer={this.handleAnswer} 
            questionNumber={currentQuestion + 1}
          />
        ) : (
          <Score score={score} /> // Hiển thị kết quả khi xong [cite: 22, 23]
        )}
      </div>
    );
  }
}
export default QuizApp;