import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import QuestionForm from './components/QuestionForm';
import Quiz from './components/Quiz';
import { loadInitialQuestions } from './features/quiz/quizSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitialQuestions());
  }, [dispatch]);

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Redux Quiz Application</h1>
        <p>Lab 6: Redux, Redux Thunk and Redux Toolkit</p>
      </header>

      <QuestionForm />
      <Quiz />
    </main>
  );
}

export default App;
