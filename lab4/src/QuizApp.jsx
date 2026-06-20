import React, { useState, useEffect, createContext, useContext } from "react";
import { Container, Row, Col, Card, Button, Form, Alert, ListGroup } from "react-bootstrap";

// Tạo Context nếu bạn chưa tách ra file riêng
export const QuizContext = createContext();

const initialQuizData = [
  {
    question: "What is ReactJS?",
    answers: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
  },
  {
    question: "What is JSX?",
    answers: [
      "A programming language",
      "A file format",
      "A syntax extension for JavaScript",
    ],
    correctAnswer: "A syntax extension for JavaScript",
  },
];

export default function QuizApp() {
  const [quizData, setQuizData] = useState(initialQuizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [newQuestion, setNewQuestion] = useState("");
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [correctAns, setCorrectAns] = useState("");

  useEffect(() => {
    setSelectedAnswer("");
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion || !ans1 || !ans2 || !ans3 || !correctAns) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    const newQuizItem = {
      question: newQuestion,
      answers: [ans1, ans2, ans3],
      correctAnswer: correctAns,
    };
    setQuizData([...quizData, newQuizItem]);
    setNewQuestion("");
    setAns1("");
    setAns2("");
    setAns3("");
    setCorrectAns("");
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return alert("Vui lòng chọn 1 đáp án!");
    setIsAnswered(true);
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Ứng Dụng Trắc Nghiệm</h2>
      <Row>
        {/* === CỘT TRÁI: THÊM CÂU HỎI === */}
        <Col md={5}>
          <Card className="mb-4">
            <Card.Header>Thêm Câu Hỏi Mới</Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddQuestion}>
                <Form.Group className="mb-3">
                  <Form.Label>Câu hỏi</Form.Label>
                  <Form.Control type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                </Form.Group>
                
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Đáp án 1" value={ans1} onChange={(e) => setAns1(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Đáp án 2" value={ans2} onChange={(e) => setAns2(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Đáp án 3" value={ans3} onChange={(e) => setAns3(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Chọn đáp án đúng</Form.Label>
                  <Form.Select value={correctAns} onChange={(e) => setCorrectAns(e.target.value)}>
                    <option value="">-- Chọn --</option>
                    {ans1 && <option value={ans1}>{ans1}</option>}
                    {ans2 && <option value={ans2}>{ans2}</option>}
                    {ans3 && <option value={ans3}>{ans3}</option>}
                  </Form.Select>
                </Form.Group>
                
                <Button type="submit" variant="primary" className="w-100">Thêm</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* === CỘT PHẢI: LÀM BÀI THI === */}
        <Col md={7}>
          <QuizContext.Provider value={{ selectedAnswer, setSelectedAnswer, isAnswered, quizData, currentQuestionIndex }}>
            <Card>
              <Card.Header>
                {!quizFinished 
                  ? `Câu hỏi: ${currentQuestionIndex + 1} / ${quizData.length} | Điểm: ${score}` 
                  : "Kết Quả"}
              </Card.Header>
              <Card.Body>
                {!quizFinished ? (
                  <>
                    <QuizQuestion />
                    
                    {isAnswered && (
                      <Alert variant={selectedAnswer === quizData[currentQuestionIndex].correctAnswer ? "success" : "danger"} className="mt-3">
                        {selectedAnswer === quizData[currentQuestionIndex].correctAnswer ? "Chính xác!" : `Sai! Đáp án đúng là: ${quizData[currentQuestionIndex].correctAnswer}`}
                      </Alert>
                    )}

                    <div className="mt-3 d-flex gap-2">
                      <Button variant="success" onClick={handleCheckAnswer} disabled={isAnswered}>Kiểm Tra</Button>
                      <Button variant="secondary" onClick={handleNextQuestion} disabled={!isAnswered}>
                        {currentQuestionIndex === quizData.length - 1 ? "Hoàn Thành" : "Câu Tiếp Theo"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <h4>Bạn đã hoàn thành bài thi!</h4>
                    <p>Điểm số: {score} / {quizData.length}</p>
                    <Button variant="primary" onClick={handleRestartQuiz}>Làm Lại</Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </QuizContext.Provider>
        </Col>
      </Row>
    </Container>
  );
}

function QuizQuestion() {
  const context = useContext(QuizContext);
  if (!context) return null;
  const { selectedAnswer, setSelectedAnswer, isAnswered, quizData, currentQuestionIndex } = context;
  const currentQuiz = quizData[currentQuestionIndex];

  return (
    <div>
      <h5>{currentQuiz.question}</h5>
      <ListGroup className="mt-3">
        {currentQuiz.answers.map((answer, index) => (
          <ListGroup.Item 
            key={index} 
            action 
            active={selectedAnswer === answer}
            onClick={() => !isAnswered && setSelectedAnswer(answer)}
            style={{ cursor: isAnswered ? "default" : "pointer" }}
          >
            {answer}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}