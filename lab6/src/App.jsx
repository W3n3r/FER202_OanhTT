import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionForm from './components/QuestionForm';
import Quiz from './components/Quiz';
import QuizReview from './components/QuizReview';
import {
  loadInitialQuestions,
  showHome,
  showQuiz,
  showReview,
} from './features/quiz/quizSlice';

function App() {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state) => state.quiz.currentPage,
  );

  useEffect(() => {
    dispatch(loadInitialQuestions());
  }, [dispatch]);

  const getPageTitle = () => {
    if (currentPage === 'home') {
      return 'Add Quiz Question';
    }

    if (currentPage === 'review') {
      return 'Quiz Review';
    }

    return 'Quiz';
  };

  return (
    <main className="app-container">
      <nav className="top-navigation">
        <button
          className={
            currentPage === 'home'
              ? 'nav-button active'
              : 'nav-button'
          }
          type="button"
          onClick={() => dispatch(showHome())}
        >
          Home
        </button>

        <button
          className={
            currentPage === 'quiz'
              ? 'nav-button active'
              : 'nav-button'
          }
          type="button"
          onClick={() => dispatch(showQuiz())}
        >
          Quiz
        </button>

        <button
          className={
            currentPage === 'review'
              ? 'nav-button active'
              : 'nav-button'
          }
          type="button"
          onClick={() => dispatch(showReview())}
        >
          Quiz Review
        </button>
      </nav>

      <header className="app-header">
        <h1>{getPageTitle()}</h1>
      </header>

      {currentPage === 'home' && <QuestionForm />}

      {currentPage === 'quiz' && <Quiz />}

      {currentPage === 'review' && <QuizReview />}
    </main>
  );
}

export default App;