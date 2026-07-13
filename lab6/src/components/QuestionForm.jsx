import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../features/quiz/quizSlice';

const emptyOptions = ['', '', '', ''];

function QuestionForm() {
  const dispatch = useDispatch();
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(emptyOptions);
  const [correctAnswer, setCorrectAnswer] = useState('0');
  const [error, setError] = useState('');

  const handleOptionChange = (index, value) => {
    setOptions((currentOptions) =>
      currentOptions.map((option, optionIndex) =>
        optionIndex === index ? value : option,
      ),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedQuestion = questionText.trim();
    const cleanedOptions = options.map((option) => option.trim());

    if (!cleanedQuestion || cleanedOptions.some((option) => !option)) {
      setError('Please enter the question and all four answer options.');
      return;
    }

    dispatch(
      addQuestion({
        questionText: cleanedQuestion,
        options: cleanedOptions,
        correctAnswer: Number(correctAnswer),
      }),
    );

    setQuestionText('');
    setOptions(emptyOptions);
    setCorrectAnswer('0');
    setError('');
  };

  return (
    <section className="panel" aria-labelledby="question-form-title">
      <h2 id="question-form-title">Add a Question</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="questionText">Question</label>
          <input
            id="questionText"
            type="text"
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
            placeholder="Enter a question"
          />
        </div>

        <div className="option-inputs">
          {options.map((option, index) => (
            <div className="form-group" key={`option-${index}`}>
              <label htmlFor={`option-${index}`}>Option {index + 1}</label>
              <input
                id={`option-${index}`}
                type="text"
                value={option}
                onChange={(event) => handleOptionChange(index, event.target.value)}
                placeholder={`Enter option ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="correctAnswer">Correct answer</label>
          <select
            id="correctAnswer"
            value={correctAnswer}
            onChange={(event) => setCorrectAnswer(event.target.value)}
          >
            {options.map((_, index) => (
              <option key={`correct-${index}`} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="primary-button" type="submit">
          Add Question
        </button>
      </form>
    </section>
  );
}

export default QuestionForm;
