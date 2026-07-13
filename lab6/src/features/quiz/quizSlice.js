import { createSlice, nanoid } from '@reduxjs/toolkit';

const sampleQuestions = [
  {
    id: 'sample-1',
    questionText: 'Which library is used to connect React components to Redux?',
    options: ['react-redux', 'react-router-dom', 'axios', 'bootstrap'],
    correctAnswer: 0,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'sample-2',
    questionText: 'Which Redux Toolkit function is used to create the store?',
    options: ['createStore', 'configureStore', 'combineReducers', 'useStore'],
    correctAnswer: 1,
    selectedAnswer: null,
    isCorrect: null,
  },
];

const initialState = {
  questions: [],
  loading: false,
  checked: false,
  message: '',
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: {
      reducer: (state, action) => {
        state.questions.push(action.payload);
        state.checked = false;
        state.message = '';
      },
      prepare: ({ questionText, options, correctAnswer }) => ({
        payload: {
          id: nanoid(),
          questionText,
          options,
          correctAnswer,
          selectedAnswer: null,
          isCorrect: null,
        },
      }),
    },
    selectAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((item) => item.id === questionId);

      if (question) {
        question.selectedAnswer = answerIndex;
      }

      state.questions.forEach((item) => {
        item.isCorrect = null;
      });
      state.checked = false;
      state.message = '';
    },
    checkAnswers: (state) => {
      const unansweredQuestionExists = state.questions.some(
        (question) => question.selectedAnswer === null,
      );

      if (unansweredQuestionExists) {
        state.checked = false;
        state.message = 'Please select an answer for every question.';
        return;
      }

      let correctCount = 0;

      state.questions.forEach((question) => {
        question.isCorrect = question.selectedAnswer === question.correctAnswer;
        if (question.isCorrect) {
          correctCount += 1;
        }
      });

      state.checked = true;
      state.message = `You answered ${correctCount}/${state.questions.length} questions correctly.`;
    },
  },
});

export const {
  setLoading,
  setQuestions,
  addQuestion,
  selectAnswer,
  checkAnswers,
} = quizSlice.actions;

// Redux Thunk action: simulates asynchronously loading the initial quiz data.
export const loadInitialQuestions = () => async (dispatch, getState) => {
  if (getState().quiz.questions.length > 0) {
    return;
  }

  dispatch(setLoading(true));

  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  dispatch(setQuestions(sampleQuestions));
  dispatch(setLoading(false));
};

export default quizSlice.reducer;
