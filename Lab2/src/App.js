import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {
  return (
    <div className="bg-dark text-white min-vh-100">
      {/* ==================== 1. COMPONENT NAVBAR (Trang 15) ==================== */}
      {/* expand="lg" giúp thanh menu tự động thu gọn mượt mà trên màn hình nhỏ */}
      <Navbar
        expand="lg"
        variant="dark"
        bg="dark"
        className="border-bottom border-secondary py-3"
      >
        <Container>
          {/* Tên thương hiệu Pizza House (Góc trái) */}
          <Navbar.Brand href="#" className="fw-bold fs-3">
            Pizza House
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="pizza-navbar-nav" />

          <Navbar.Collapse id="pizza-navbar-nav">
            {/* Thanh menu điều hướng ở giữa */}
            <Nav className="me-auto ps-lg-3 gap-2">
              <Nav.Link
                href="#"
                active
                className="bg-secondary text-white rounded px-3"
              >
                Home
              </Nav.Link>
              <Nav.Link href="#" className="text-light opacity-75 px-3">
                About Us
              </Nav.Link>
              <Nav.Link href="#" className="text-light opacity-75 px-3">
                Contact
              </Nav.Link>
            </Nav>

            {/* Ô tìm kiếm góc bên phải sử dụng Form control của Bootstrap */}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="rounded-0 rounded-start border-secondary bg-transparent text-white"
              />
              <Button variant="danger" className="rounded-0 rounded-end">
                🔍
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ==================== 2. HERO BANNER (Bố cục ảnh nền lớn) ==================== */}
      <div
        className="position-relative text-center"
        style={{ overflow: "hidden" }}
      >
        {/* Gọi file ảnh lớn từ thư mục public/images đã chuẩn bị */}
        <img
          src="/images/pizza1.jpg"
          className="w-100 object-fit-cover"
          style={{ height: "400px", filter: "brightness(50%)" }}
          alt="Pizza House Banner"
        />
        {/* Text canh giữa đè lên ảnh nền */}
        <div className="position-absolute top-50 start-50 translate-middle w-100 px-3">
          <h1 className="fw-light display-4">Neapolitan Pizza</h1>
          <p className="lead fs-5 text-light opacity-75">
            If you are looking for a traditional Italian pizza, the Neapolitan
            is the best option!
          </p>
        </div>
        {/* Các nút mũi tên điều hướng hai bên */}
        <button className="position-absolute top-50 start-0 translate-middle-y btn text-white fs-2 opacity-50 ps-4">
          &lt;
        </button>
        <button className="position-absolute top-50 end-0 translate-middle-y btn text-white fs-2 opacity-50 pe-4">
          &gt;
        </button>
      </div>

      {/* ==================== 3. GRID SYSTEM & CARDS: OUR MENU (Trang 7, 22) ==================== */}
      <Container className="my-5">
        <h2 className="fs-3 fw-normal mb-4">Our Menu</h2>

        {/* Row g-4 thiết lập khoảng cách đều giữa các thẻ món ăn */}
        <Row className="g-4">
          {/* Món 1: Margherita Pizza */}
          {/* Chia cột: Màn hình điện thoại hiển thị dọc (xs=12), máy tính bảng (md=6), màn hình lớn (lg=3) */}
          <Col xs={12} md={6} lg={3}>
            <Card className="h-100 position-relative border-0 rounded-1 text-dark bg-light">
              {/* Thẻ tag trạng thái SALE */}
              <span className="position-absolute top-0 start-0 bg-warning text-dark fw-bold px-2 py-1 small m-2 rounded-1">
                SALE
              </span>
              <Card.Img
                variant="top"
                src="/images/menu1.jpg"
                className="object-fit-cover"
                style={{ height: "180px" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fs-6 fw-bold mb-1">
                    Margherita Pizza
                  </Card.Title>
                  <Card.Text className="text-muted small mb-3">
                    <del className="me-2">$40.00</del>
                    <span className="text-warning fw-bold fs-6">$24.00</span>
                  </Card.Text>
                </div>
                <Button
                  variant="dark"
                  className="w-100 rounded-1 text-white py-2"
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Món 2: Mushroom Pizza */}
          <Col xs={12} md={6} lg={3}>
            <Card className="h-100 border-0 rounded-1 text-dark bg-light">
              <Card.Img
                variant="top"
                src="/images/menu2.jpg"
                className="object-fit-cover"
                style={{ height: "180px" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fs-6 fw-bold mb-1">
                    Mushroom Pizza
                  </Card.Title>
                  <Card.Text className="text-muted fw-bold mb-3">
                    $25.00
                  </Card.Text>
                </div>
                <Button
                  variant="dark"
                  className="w-100 rounded-1 text-white py-2"
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Món 3: Hawaiian Pizza */}
          <Col xs={12} md={6} lg={3}>
            <Card className="h-100 position-relative border-0 rounded-1 text-dark bg-light">
              <span className="position-absolute top-0 start-0 bg-warning text-dark fw-bold px-2 py-1 small m-2 rounded-1">
                NEW
              </span>
              <Card.Img
                variant="top"
                src="/images/menu3.jpg"
                className="object-fit-cover"
                style={{ height: "180px" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fs-6 fw-bold mb-1">
                    Hawaiian Pizza
                  </Card.Title>
                  <Card.Text className="text-muted fw-bold mb-3">
                    $30.00
                  </Card.Text>
                </div>
                <Button
                  variant="dark"
                  className="w-100 rounded-1 text-white py-2"
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Món 4: Pesto Pizza */}
          <Col xs={12} md={6} lg={3}>
            <Card className="h-100 position-relative border-0 rounded-1 text-dark bg-light">
              <span className="position-absolute top-0 start-0 bg-warning text-dark fw-bold px-2 py-1 small m-2 rounded-1">
                SALE
              </span>
              <Card.Img
                variant="top"
                src="/images/menu4.jpg"
                className="object-fit-cover"
                style={{ height: "180px" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fs-6 fw-bold mb-1">
                    Pesto Pizza
                  </Card.Title>
                  <Card.Text className="text-muted small mb-3">
                    <del className="me-2">$50.00</del>
                    <span className="text-warning fw-bold fs-6">$30.00</span>
                  </Card.Text>
                </div>
                <Button
                  variant="dark"
                  className="w-100 rounded-1 text-white py-2"
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ==================== 4. FORMS: BOOK YOUR TABLE (Trang 18) ==================== */}
      <Container className="my-5 pb-5" style={{ maxWidth: "850px" }}>
        <h2 className="fs-3 fw-normal mb-4 text-center">Book Your Table</h2>

        <Form onSubmit={(e) => e.preventDefault()}>
          {/* Dùng Row hệ thống để xếp 3 ô nhập liệu nằm ngang nhau */}
          <Row className="g-3 mb-3">
            <Col xs={12} md={4}>
              <Form.Control
                type="text"
                placeholder="Your Name *"
                className="rounded-1 py-2 bg-light border-0"
                required
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Control
                type="email"
                placeholder="Your Email *"
                className="rounded-1 py-2 bg-light border-0"
                required
              />
            </Col>
            <Col xs={12} md={4}>
              {/* Thành phần Form.Select chuẩn của React-Bootstrap bài học trang 18 */}
              <Form.Select
                className="rounded-1 py-2 bg-light border-0 text-muted"
                defaultValue="disabled"
              >
                <option value="disabled" disabled>
                  Select a Service
                </option>
                <option value="1">Dine In</option>
                <option value="2">Take Away</option>
                <option value="3">Delivery</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Ô nhập ý kiến văn bản dài */}
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Please write your comment"
              className="rounded-1 bg-light border-0"
            />
          </Form.Group>

          {/* Nút gửi thông tin màu vàng Variant Warning đúng tài liệu trang 10 */}
          <div className="text-start">
            <Button
              type="submit"
              variant="warning"
              className="text-dark fw-semibold rounded-1 px-4 py-2"
            >
              Send Message
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default App;
