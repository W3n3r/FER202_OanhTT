import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  ListGroup,
} from "react-bootstrap";
import { QuizContext } from "./QuizContext";

// Dữ liệu câu hỏi mặc định ban đầu bắt buộc theo yêu cầu của đề bài Lab
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
  // --- 1. QUẢN LÝ TRẠNG THÁI BẰNG useState HOOK ---
  const [quizData, setQuizData] = useState(initialQuizData); // Mảng lưu danh sách câu hỏi động
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Vị trí câu hỏi hiện tại đang làm
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Đáp án người làm đang chọn
  const [isAnswered, setIsAnswered] = useState(false); // Trạng thái đã bấm nút "Kiểm Tra Đáp Án" chưa
  const [score, setScore] = useState(0); // Điểm số tích lũy
  const [quizFinished, setQuizFinished] = useState(false); // Trạng thái đã làm xong hết bài

  // Các State quản lý Form nhập liệu khi tự thêm câu hỏi mới (User Input Functionality)
  const [newQuestion, setNewQuestion] = useState("");
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [correctAns, setCorrectAns] = useState("");

  // --- 2. TỰ ĐỘNG ĐỒNG BỘ TRẠNG THÁI BẰNG useEffect HOOK ---
  // Mỗi khi chỉ mục câu hỏi (currentQuestionIndex) thay đổi, tự động reset trạng thái câu trả lời về ban đầu
  useEffect(() => {
    setSelectedAnswer("");
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  // --- 3. LOGIC HÀM XỬ LÝ SỰ KIỆN (EVENT HANDLERS) ---

  // Hàm xử lý thêm câu hỏi mới từ Form nhập liệu vào mảng State
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion || !ans1 || !ans2 || !ans3 || !correctAns) {
      alert(
        "Vui lòng nhập đầy đủ nội dung câu hỏi, 3 đáp án và chọn đáp án đúng!",
      );
      return;
    }

    const newQuizItem = {
      question: newQuestion,
      answers: [ans1, ans2, ans3],
      correctAnswer: correctAns,
    };

    // Cập nhật State mảng câu hỏi bằng cách giữ lại mảng cũ và thêm phần tử mới
    setQuizData([...quizData, newQuizItem]);

    // Reset toàn bộ các ô nhập dữ liệu của Form về trống
    setNewQuestion("");
    setAns1("");
    setAns2("");
    setAns3("");
    setCorrectAns("");
  };

  // Hàm chấm điểm khi người dùng bấm nút "Kiểm Tra Đáp Án"
  const handleCheckAnswer = () => {
    if (!selectedAnswer) {
      alert("Vui lòng tích chọn một đáp án trước khi kiểm tra!");
      return;
    }
    setIsAnswered(true);
    // Nếu đáp án chọn trùng với correctAnswer của câu hỏi hiện tại thì tăng 1 điểm
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  // Hàm chuyển sang câu hỏi tiếp theo hoặc kết thúc bài trắc nghiệm
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true); // Nếu là câu cuối cùng thì chuyển sang màn hình kết quả
    }
  };

  // Hàm làm lại bài từ đầu
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer("");
    setIsAnswered(false);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 text-primary fw-bold">
        ReactJS Hooks Quiz Application
      </h1>

      <Row className="g-4">
        {/* ================= CỘT TRÁI: FORM NHẬP THÊM CÂU HỎI ================= */}
        <Col lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="fw-bold text-secondary mb-3">
                <i className="bi bi-plus-circle-fill me-2"></i>Thêm Câu Hỏi Mới
              </Card.Title>
              <Form onSubmit={handleAddQuestion}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Nội dung câu hỏi:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập câu hỏi tại đây..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label className="fw-semibold">Đáp án A:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập đáp án A"
                    value={ans1}
                    onChange={(e) => setAns1(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label className="fw-semibold">Đáp án B:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập đáp án B"
                    value={ans2}
                    onChange={(e) => setAns2(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Đáp án C:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập đáp án C"
                    value={ans3}
                    onChange={(e) => setAns3(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold text-success">
                    Chọn đáp án đúng chính xác:
                  </Form.Label>
                  <Form.Select
                    value={correctAns}
                    onChange={(e) => setCorrectAns(e.target.value)}
                  >
                    <option value="">-- Chọn đáp án đúng --</option>
                    {ans1 && <option value={ans1}>{ans1}</option>}
                    {ans2 && <option value={ans2}>{ans2}</option>}
                    {ans3 && <option value={ans3}>{ans3}</option>}
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 fw-bold"
                >
                  Thêm Vào Bộ Câu Hỏi
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* ================= CỘT PHẢI: KHU VỰC THI TRẮC NGHIỆM ================= */}
        <Col lg={7}>
          {/* Sử dụng QuizContext.Provider để truyền toàn bộ dữ liệu động xuống các component con */}
          <QuizContext.Provider
            value={{
              selectedAnswer,
              setSelectedAnswer,
              isAnswered,
              quizData,
              currentQuestionIndex,
            }}
          >
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                {!quizFinished ? (
                  <div>
                    {/* Phần hiển thị tiến độ câu hỏi động dựa trên độ dài thực tế của mảng quizData */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-secondary px-3 py-2 fs-6">
                        Câu hỏi: {currentQuestionIndex + 1} / {quizData.length}
                      </span>
                      <span className="fw-bold text-info">
                        Điểm số hiện tại: {score}
                      </span>
                    </div>

                    {/* Gọi Component con để hiển thị câu hỏi tách biệt (Component Composition) */}
                    <QuizQuestion />

                    {/* Giao diện hiển thị thông báo Alert kết quả ngay sau khi bấm nút Check */}
                    {isAnswered && (
                      <Alert
                        variant={
                          selectedAnswer ===
                          quizData[currentQuestionIndex].correctAnswer
                            ? "success"
                            : "danger"
                        }
                        className="mt-3 py-2 fw-semibold"
                      >
                        {selectedAnswer ===
                        quizData[currentQuestionIndex].correctAnswer
                          ? "🎉 Chính xác! Bạn đã trả lời đúng câu hỏi này."
                          : `❌ Sai rồi! Đáp án đúng phải là: ${quizData[currentQuestionIndex].correctAnswer}`}
                      </Alert>
                    )}

                    {/* Khu vực chứa các nút chức năng điều khiển làm bài */}
                    <div className="mt-4 d-flex gap-2">
                      <Button
                        variant="success"
                        className="w-50 fw-bold"
                        onClick={handleCheckAnswer}
                        disabled={isAnswered}
                      >
                        Kiểm Tra Đáp Án
                      </Button>
                      <Button
                        variant="dark"
                        className="w-50 fw-bold"
                        onClick={handleNextQuestion}
                        disabled={!isAnswered}
                      >
                        {currentQuestionIndex === quizData.length - 1
                          ? "Hoàn Thành"
                          : "Câu Tiếp Theo"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* GIAO DIỆN KHI NGƯỜI DÙNG ĐÃ HOÀN THÀNH TẤT CẢ CÁC CÂU HỎI */
                  <div className="text-center my-auto py-5">
                    <h2 className="fw-bold text-success mb-3">
                      🎉 Chúc mừng bạn đã hoàn thành bài trắc nghiệm!
                    </h2>
                    <p className="fs-5 text-muted">
                      Kết quả tổng số điểm của bạn đạt được là:
                    </p>
                    <div className="display-3 fw-bold text-primary mb-4">
                      {score} / {quizData.length}
                    </div>
                    <Button
                      variant="outline-primary"
                      size="lg"
                      className="fw-bold px-5"
                      onClick={handleRestartQuiz}
                    >
                      Làm Lại Từ Đầu
                    </Button>
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

// --- 4. COMPONENT CON SỬ DỤNG HOOK useContext ĐỂ TIÊU THỤ DỮ LIỆU ĐỘNG ---
function QuizQuestion() {
  const context = useContext(QuizContext);
  if (!context) return null;

  const {
    selectedAnswer,
    setSelectedAnswer,
    isAnswered,
    quizData,
    currentQuestionIndex,
  } = context;
  const currentQuiz = quizData[currentQuestionIndex];

  if (!currentQuiz) return <p>Đang tải câu hỏi...</p>;

  return (
    <div>
      <h4 className="fw-bold text-dark mb-4 p-3 bg-light rounded border-start border-4 border-primary">
        {currentQuiz.question}
      </h4>

      {/* Sửa <Form> thành <div> để chặn hành vi tự động Submit làm mới trang */}
      <div className="mt-3">
        <ListGroup className="shadow-sm">
          {currentQuiz.answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            return (
              <ListGroup.Item
                key={index}
                as="div" /* QUAN TRỌNG: Ép kiểu thành div để không bị hiểu là nút button submit */
                action
                active={isSelected}
                variant={isSelected ? "primary" : "light"}
                className={`p-3 d-flex align-items-center ${isAnswered ? "disabled" : ""}`}
                onClick={() => !isAnswered && setSelectedAnswer(answer)}
                style={{ cursor: isAnswered ? "not-allowed" : "pointer" }}
              >
                <Form.Check
                  type="radio"
                  id={`radio-${index}`}
                  name="quiz-options"
                  label={<span className="ms-2 fs-5">{answer}</span>}
                  checked={isSelected}
                  onChange={() => {}}
                  disabled={isAnswered}
                  className="w-100 m-0"
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
}
