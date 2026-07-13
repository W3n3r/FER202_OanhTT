import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/quiz/quizSlice';

// configureStore automatically includes Redux Thunk middleware.
export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
