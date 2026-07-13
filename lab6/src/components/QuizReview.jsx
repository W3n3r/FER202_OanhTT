import { useDispatch, useSelector } from 'react-redux';
import {
  goToQuestion,
  resetQuiz,
  showQuiz,
  submitQuiz,
} from '../features/quiz/quizSlice';

function QuizReview() {
  const dispatch = useDispatch();

  const {
    questions,
    submitted,
    score,
    message,
  } = useSelector((state) => state.quiz);

  const getQuestionStatus = (question) => {
    if (submitted) {
      return question.isCorrect
        ? 'Correct'
        : 'Incorrect';
    }

    return question.selectedAnswer === null
      ? 'Not Answered'
      : 'Answered';
  };

  const getQuestionClassName = (question) => {
    if (submitted) {
      return question.isCorrect
        ? 'review-card review-correct'
        : 'review-card review-incorrect';
    }

    return question.selectedAnswer === null
      ? 'review-card review-unanswered'
      : 'review-card review-answered';
  };

  return (
    <section className="review-section">
      <h2>Quiz Review</h2>

      <div className="review-grid">
        {questions.map((question, questionIndex) => (
          <button
            className={getQuestionClassName(question)}
            type="button"
            key={question.id}
            onClick={() =>
              dispatch(goToQuestion(questionIndex))
            }
          >
            <span className="review-label">
              Question No
            </span>

            <strong className="review-number">
              {questionIndex + 1}
            </strong>

            <span className="review-status">
              {getQuestionStatus(question)}
            </span>
          </button>
        ))}
      </div>

      {message && (
        <p
          className={
            submitted
              ? 'summary-message'
              : 'warning-message'
          }
        >
          {message}
        </p>
      )}

      {submitted && (
        <div className="score-box">
          Score: {score}/{questions.length}
        </div>
      )}

      <div className="footer-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={() => dispatch(showQuiz())}
        >
          Quiz
        </button>

        <button
          className="secondary-button"
          type="button"
          disabled
        >
          Quiz Review
        </button>

        <button
          className="submit-button"
          type="button"
          disabled={submitted}
          onClick={() => dispatch(submitQuiz())}
        >
          Submit
        </button>

        {submitted && (
          <button
            className="primary-button"
            type="button"
            onClick={() => dispatch(resetQuiz())}
          >
            Try Again
          </button>
        )}
      </div>
    </section>
  );
}

export default QuizReview;