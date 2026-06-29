import React, { useState, useEffect, createContext } from 'react'
import { Container, Row, Col, Card, Button, Alert, Form, ProgressBar, Badge } from 'react-bootstrap'
import QuizQuestion from '../components/QuizQuestion'

export const QuizContext = createContext()

const initialQuizData = [
  {
    question: 'What is ReactJS?',
    answers: ['A JavaScript library for building user interfaces', 'A programming language', 'A database management system'],
    correctAnswer: 'A JavaScript library for building user interfaces',
  },
  {
    question: 'What is JSX?',
    answers: ['A programming language', 'A file format', 'A syntax extension for JavaScript'],
    correctAnswer: 'A syntax extension for JavaScript',
  },
  {
    question: 'Which hook is used to manage state in React functional components?',
    answers: ['useEffect', 'useState', 'useContext'],
    correctAnswer: 'useState',
  },
  {
    question: 'What does React Router provide?',
    answers: ['Client-side routing for React apps', 'Server-side rendering', 'Data fetching utilities'],
    correctAnswer: 'Client-side routing for React apps',
  },
  {
    question: 'What is the correct way to pass data from parent to child in React?',
    answers: ['Using State', 'Using Props', 'Using Refs'],
    correctAnswer: 'Using Props',
  },
  {
    question: 'Which component from React Router creates links without full page reload?',
    answers: ['<a>', '<Link>', '<Navigate>'],
    correctAnswer: '<Link>',
  },
]

export default function Quiz() {
  const [quizData, setQuizData] = useState(initialQuizData)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  // Add question form states
  const [newQuestion, setNewQuestion] = useState('')
  const [ans1, setAns1] = useState('')
  const [ans2, setAns2] = useState('')
  const [ans3, setAns3] = useState('')
  const [correctAns, setCorrectAns] = useState('')
  const [addSuccess, setAddSuccess] = useState(false)

  useEffect(() => {
    setSelectedAnswer('')
    setIsAnswered(false)
  }, [currentQuestionIndex])

  const handleAddQuestion = (e) => {
    e.preventDefault()
    if (!newQuestion || !ans1 || !ans2 || !ans3 || !correctAns) {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }
    setQuizData([...quizData, { question: newQuestion, answers: [ans1, ans2, ans3], correctAnswer: correctAns }])
    setNewQuestion(''); setAns1(''); setAns2(''); setAns3(''); setCorrectAns('')
    setAddSuccess(true)
    setTimeout(() => setAddSuccess(false), 2500)
  }

  const handleCheckAnswer = () => {
    if (!selectedAnswer) { alert('Vui lòng chọn 1 đáp án!'); return }
    setIsAnswered(true)
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) setScore(score + 1)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1)
    else setQuizFinished(true)
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizFinished(false)
  }

  const progress = Math.round(((currentQuestionIndex + (isAnswered ? 1 : 0)) / quizData.length) * 100)

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-1">React &amp; JavaScript Quiz</h2>
      <p className="text-muted mb-4">Test your knowledge — {quizData.length} questions total</p>

      <Row className="g-4">
        {/* Left: Add question */}
        <Col md={5}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="fw-semibold bg-white border-bottom">
              ➕ Add New Question
            </Card.Header>
            <Card.Body>
              {addSuccess && <Alert variant="success" className="py-2 mb-3">Question added! ✅</Alert>}
              <Form onSubmit={handleAddQuestion}>
                <Form.Group className="mb-3">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter question..."
                    value={newQuestion}
                    onChange={e => setNewQuestion(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Answer A" value={ans1} onChange={e => setAns1(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Answer B" value={ans2} onChange={e => setAns2(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Answer C" value={ans3} onChange={e => setAns3(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correct Answer</Form.Label>
                  <Form.Select value={correctAns} onChange={e => setCorrectAns(e.target.value)}>
                    <option value="">-- Select --</option>
                    {ans1 && <option value={ans1}>{ans1}</option>}
                    {ans2 && <option value={ans2}>{ans2}</option>}
                    {ans3 && <option value={ans3}>{ans3}</option>}
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">Add Question</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right: Quiz */}
        <Col md={7}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              {!quizFinished ? (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">
                      Question {currentQuestionIndex + 1} / {quizData.length}
                    </span>
                    <Badge bg="success">Score: {score}</Badge>
                  </div>
                  <ProgressBar now={progress} variant="primary" style={{ height: 6 }} />
                </div>
              ) : (
                <span className="fw-semibold">🏁 Quiz Finished</span>
              )}
            </Card.Header>

            <Card.Body className="p-4">
              <QuizContext.Provider value={{ selectedAnswer, setSelectedAnswer, isAnswered, quizData, currentQuestionIndex }}>
                {!quizFinished ? (
                  <>
                    <QuizQuestion />

                    {isAnswered && (
                      <Alert
                        variant={selectedAnswer === quizData[currentQuestionIndex].correctAnswer ? 'success' : 'danger'}
                        className="mt-3"
                      >
                        {selectedAnswer === quizData[currentQuestionIndex].correctAnswer
                          ? '✅ Correct!'
                          : `❌ Wrong! Correct answer: ${quizData[currentQuestionIndex].correctAnswer}`}
                      </Alert>
                    )}

                    <div className="mt-4 d-flex gap-2">
                      <Button variant="success" onClick={handleCheckAnswer} disabled={isAnswered}>
                        Check Answer
                      </Button>
                      <Button variant="outline-secondary" onClick={handleNextQuestion} disabled={!isAnswered}>
                        {currentQuestionIndex === quizData.length - 1 ? 'Finish' : 'Next →'}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-3">
                    <div style={{ fontSize: '3rem' }}>{score >= quizData.length * 0.7 ? '🎉' : '📚'}</div>
                    <h4 className="fw-bold mt-2">Quiz Completed!</h4>
                    <p className="text-muted mb-1">Your score:</p>
                    <h2 className="text-primary fw-bold">{score} / {quizData.length}</h2>
                    <p className="text-muted mb-4">
                      {score >= quizData.length * 0.7 ? 'Great job! 🌟' : 'Keep practicing! 💪'}
                    </p>
                    <Button variant="primary" onClick={handleRestartQuiz}>
                      🔄 Restart Quiz
                    </Button>
                  </div>
                )}
              </QuizContext.Provider>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
