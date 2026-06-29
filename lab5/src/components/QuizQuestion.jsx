import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { QuizContext } from '../pages/Quiz'

export default function QuizQuestion() {
  const { selectedAnswer, setSelectedAnswer, isAnswered, quizData, currentQuestionIndex } = useContext(QuizContext)
  const currentQuiz = quizData[currentQuestionIndex]

  return (
    <div>
      <h5 className="mb-3">
        <span className="badge bg-primary me-2">Q{currentQuestionIndex + 1}</span>
        {currentQuiz.question}
      </h5>
      <ListGroup>
        {currentQuiz.answers.map((answer, index) => {
          let variant = ''
          if (isAnswered) {
            if (answer === currentQuiz.correctAnswer) variant = 'list-group-item-success'
            else if (answer === selectedAnswer) variant = 'list-group-item-danger'
          }
          return (
            <ListGroup.Item
              key={index}
              action={!isAnswered}
              active={!isAnswered && selectedAnswer === answer}
              className={`quiz-option ${isAnswered ? 'disabled-option' : ''} ${variant}`}
              onClick={() => !isAnswered && setSelectedAnswer(answer)}
            >
              <span className="me-2 fw-bold">{String.fromCharCode(65 + index)}.</span>
              {answer}
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
  )
}
