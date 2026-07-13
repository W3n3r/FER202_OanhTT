import { useDispatch, useSelector } from 'react-redux';
import {
  goToNextQuestion,
  goToPreviousQuestion,
  selectAnswer,
  showReview,
  submitQuiz,
} from '../features/quiz/quizSlice';

function Quiz() {
  const dispatch = useDispatch();

  const {
    questions,
    loading,
    currentQuestionIndex,
    submitted,
  } = useSelector((state) => state.quiz);

  if (loading) {
    return (
      <p className="status-message">
        Loading quiz questions...
      </p>
    );
  }

  if (questions.length === 0) {
    return (
      <section className="quiz-section">
        <p>There are no questions available.</p>
      </section>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const getOptionClassName = (optionIndex) => {
    const classes = ['answer-option'];

    const isSelected =
      currentQuestion.selectedAnswer === optionIndex;

    if (isSelected) {
      classes.push('selected');
    }

    // Sau khi Submit thì hiển thị đáp án đúng và sai.
    if (
      submitted &&
      optionIndex === currentQuestion.correctAnswer
    ) {
      classes.push('correct');
    }

    if (
      submitted &&
      isSelected &&
      optionIndex !== currentQuestion.correctAnswer
    ) {
      classes.push('incorrect');
    }

    return classes.join(' ');
  };

  return (
    <section className="quiz-section">
      <div className="quiz-heading">
        <h2>Quiz</h2>

        <p className="progress-text">
          Question {currentQuestionIndex + 1} of{' '}
          {questions.length}
        </p>
      </div>

      <article className="question-card">
        <h3>
          {currentQuestionIndex + 1}.{' '}
          {currentQuestion.questionText}
        </h3>

        <div className="answers-list">
          {currentQuestion.options.map(
            (option, optionIndex) => (
              <label
                className={getOptionClassName(optionIndex)}
                key={`${currentQuestion.id}-${optionIndex}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={
                    currentQuestion.selectedAnswer ===
                    optionIndex
                  }
                  disabled={submitted}
                  onChange={() =>
                    dispatch(
                      selectAnswer({
                        questionId: currentQuestion.id,
                        answerIndex: optionIndex,
                      }),
                    )
                  }
                />

                <span>{option}</span>
              </label>
            ),
          )}
        </div>

        {submitted && (
          <p
            className={
              currentQuestion.isCorrect
                ? 'result correct-text'
                : 'result incorrect-text'
            }
          >
            {currentQuestion.isCorrect
              ? 'Correct answer.'
              : 'Incorrect answer.'}
          </p>
        )}
      </article>

      <div className="quiz-navigation">
        <button
          className="secondary-button"
          type="button"
          disabled={currentQuestionIndex === 0}
          onClick={() =>
            dispatch(goToPreviousQuestion())
          }
        >
          Previous
        </button>

        <button
          className="secondary-button"
          type="button"
          disabled={
            currentQuestionIndex === questions.length - 1
          }
          onClick={() => dispatch(goToNextQuestion())}
        >
          Next
        </button>
      </div>

      <div className="footer-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={() => dispatch(showReview())}
        >
          Quiz Review
        </button>

        <button
          className="submit-button"
          type="button"
          onClick={() => dispatch(submitQuiz())}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default Quiz;