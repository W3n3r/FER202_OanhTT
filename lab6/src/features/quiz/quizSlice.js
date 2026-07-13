import { createSlice, nanoid } from '@reduxjs/toolkit';

const sampleQuestions = [
  {
    id: 'question-1',
    questionText: 'Which library is used to connect React components to Redux?',
    options: ['react-redux', 'react-router-dom', 'axios', 'bootstrap'],
    correctAnswer: 0,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'question-2',
    questionText: 'Which Redux Toolkit function is used to create the store?',
    options: ['createStore', 'configureStore', 'combineReducers', 'useStore'],
    correctAnswer: 1,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'question-3',
    questionText: 'Which hook is used to get data from the Redux Store?',
    options: ['useState', 'useEffect', 'useSelector', 'useContext'],
    correctAnswer: 2,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'question-4',
    questionText: 'Which hook is used to send an action to Redux?',
    options: ['useDispatch', 'useSelector', 'useReducer', 'useMemo'],
    correctAnswer: 0,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'question-5',
    questionText: 'What does createSlice create?',
    options: [
      'Only reducers',
      'Only actions',
      'Actions and reducers',
      'React components',
    ],
    correctAnswer: 2,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'question-6',
    questionText: 'Redux Thunk is mainly used for which type of action?',
    options: [
      'CSS actions',
      'Asynchronous actions',
      'HTML actions',
      'Routing actions',
    ],
    correctAnswer: 1,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'question-7',
    questionText: 'Where is the global Redux state stored?',
    options: ['Store', 'Component', 'CSS file', 'HTML file'],
    correctAnswer: 0,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'question-8',
    questionText: 'Which component provides the Redux Store to React?',
    options: ['BrowserRouter', 'Provider', 'StrictMode', 'Fragment'],
    correctAnswer: 1,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'question-9',
    questionText: 'Which property contains reducers in configureStore?',
    options: ['state', 'action', 'reducer', 'dispatch'],
    correctAnswer: 2,
    selectedAnswer: null,
    isCorrect: null,
  },
  {
    id: 'question-10',
    questionText: 'Which function is used to loop through quiz questions?',
    options: ['filter()', 'map()', 'find()', 'reduce()'],
    correctAnswer: 1,
    selectedAnswer: null,
    isCorrect: null,
  },
];

const initialState = {
  questions: [],
  loading: false,

  // Câu hỏi đang được hiển thị.
  currentQuestionIndex: 0,

  // home, quiz hoặc review.
  currentPage: 'quiz',

  // Trạng thái sau khi nộp bài.
  submitted: false,
  score: 0,
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
      state.currentQuestionIndex = 0;
      state.currentPage = 'quiz';
      state.submitted = false;
      state.score = 0;
      state.message = '';
    },

    addQuestion: {
      reducer: (state, action) => {
        state.questions.push(action.payload);

        // Nếu thêm câu hỏi mới thì kết quả nộp trước đó không còn hợp lệ.
        state.questions.forEach((question) => {
          question.isCorrect = null;
        });

        state.submitted = false;
        state.score = 0;
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

    // Lưu đáp án người dùng đã chọn vào Redux Store.
    selectAnswer: (state, action) => {
      if (state.submitted) {
        return;
      }

      const { questionId, answerIndex } = action.payload;

      const question = state.questions.find(
        (item) => item.id === questionId,
      );

      if (question) {
        question.selectedAnswer = answerIndex;
      }

      state.message = '';
    },

    // Chuyển đến một câu cụ thể từ trang Quiz Review.
    goToQuestion: (state, action) => {
      const questionIndex = action.payload;

      if (
        questionIndex >= 0 &&
        questionIndex < state.questions.length
      ) {
        state.currentQuestionIndex = questionIndex;
        state.currentPage = 'quiz';
      }
    },

    goToPreviousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },

    goToNextQuestion: (state) => {
      if (
        state.currentQuestionIndex <
        state.questions.length - 1
      ) {
        state.currentQuestionIndex += 1;
      }
    },

    showHome: (state) => {
      state.currentPage = 'home';
    },

    showQuiz: (state) => {
      state.currentPage = 'quiz';
    },

    showReview: (state) => {
      state.currentPage = 'review';
    },

    // Chấm toàn bộ bài.
    submitQuiz: (state) => {
      if (state.questions.length === 0) {
        state.message = 'There are no questions to submit.';
        return;
      }

      const unansweredCount = state.questions.filter(
        (question) => question.selectedAnswer === null,
      ).length;

      // Nếu còn câu chưa làm thì chuyển sang Review để người dùng kiểm tra.
      if (unansweredCount > 0) {
        state.submitted = false;
        state.currentPage = 'review';
        state.message = `You still have ${unansweredCount} unanswered question(s).`;
        return;
      }

      let correctCount = 0;

      state.questions.forEach((question) => {
        question.isCorrect =
          question.selectedAnswer === question.correctAnswer;

        if (question.isCorrect) {
          correctCount += 1;
        }
      });

      state.score = correctCount;
      state.submitted = true;
      state.currentPage = 'review';
      state.message = `You answered ${correctCount}/${state.questions.length} questions correctly.`;
    },

    resetQuiz: (state) => {
      state.questions.forEach((question) => {
        question.selectedAnswer = null;
        question.isCorrect = null;
      });

      state.currentQuestionIndex = 0;
      state.currentPage = 'quiz';
      state.submitted = false;
      state.score = 0;
      state.message = '';
    },
  },
});

export const {
  setLoading,
  setQuestions,
  addQuestion,
  selectAnswer,
  goToQuestion,
  goToPreviousQuestion,
  goToNextQuestion,
  showHome,
  showQuiz,
  showReview,
  submitQuiz,
  resetQuiz,
} = quizSlice.actions;

// Redux Thunk: giả lập tải dữ liệu câu hỏi bất đồng bộ.
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