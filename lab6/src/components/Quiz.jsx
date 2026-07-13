import { useDispatch, useSelector } from 'react-redux';
import { checkAnswers, selectAnswer } from '../features/quiz/quizSlice';

function Quiz() {
  const dispatch = useDispatch();
  const { questions, loading, checked, message } = useSelector(
    (state) => state.quiz,
  );

  const getOptionClassName = (question, optionIndex) => {
    const classes = ['answer-option'];
    const isSelected = question.selectedAnswer === optionIndex;

    if (isSelected) {
      classes.push('selected');
    }

    if (checked && optionIndex === question.correctAnswer) {
      classes.push('correct');
    }

    if (checked && isSelected && optionIndex !== question.correctAnswer) {
      classes.push('incorrect');
    }

    return classes.join(' ');
  };

  if (loading) {
    return <p className="status-message">Loading quiz questions...</p>;
  }

  return (
    <section className="quiz-section" aria-labelledby="quiz-title">
      <h2 id="quiz-title">Quiz Questions</h2>

      {questions.map((question, questionIndex) => (
        <article className="question-card" key={question.id}>
          <h3>
            {questionIndex + 1}. {question.questionText}
          </h3>

          <div className="answers-list">
            {question.options.map((option, optionIndex) => (
              <label
                className={getOptionClassName(question, optionIndex)}
                key={`${question.id}-${optionIndex}`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={question.selectedAnswer === optionIndex}
                  onChange={() =>
                    dispatch(
                      selectAnswer({
                        questionId: question.id,
                        answerIndex: optionIndex,
                      }),
                    )
                  }
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {checked && (
            <p className={question.isCorrect ? 'result correct-text' : 'result incorrect-text'}>
              {question.isCorrect ? 'Correct answer.' : 'Incorrect answer.'}
            </p>
          )}
        </article>
      ))}

      {questions.length > 0 && (
        <button
          className="check-button"
          type="button"
          onClick={() => dispatch(checkAnswers())}
        >
          Check Answers
        </button>
      )}

      {message && (
        <p className={checked ? 'summary-message' : 'warning-message'}>{message}</p>
      )}
    </section>
  );
}

export default Quiz;
