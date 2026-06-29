import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const features = [
  { icon: '📰', title: 'News Feed',     desc: 'Stay updated with the latest food and lifestyle news.' },
  { icon: '🧠', title: 'Interactive Quiz', desc: 'Test your React and JavaScript knowledge with our quiz.' },
  { icon: '📬', title: 'Contact Form',  desc: 'Reach out to us anytime via the contact page.' },
  { icon: '⚡', title: 'Built with React', desc: 'Powered by React Router v7, React Bootstrap and Vite.' },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <div className="about-hero">
        <h1 className="fw-bold display-5 mb-3">About FoodNews</h1>
        <p className="lead mb-4" style={{ maxWidth: 560, margin: '0 auto 16px' }}>
          A single-page application built with React Router that combines food news,
          interactive quizzes, and more — all without a full page reload.
        </p>
        <Link to="/contact" className="btn btn-light btn-lg">Get in Touch</Link>
      </div>

      {/* Features */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4">What We Offer</h2>
        <Row className="g-4">
          {features.map((f) => (
            <Col key={f.title} xs={12} sm={6} lg={3}>
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div style={{ fontSize: '2rem', marginBottom: 10 }}>{f.icon}</div>
                  <Card.Title className="fw-semibold">{f.title}</Card.Title>
                  <Card.Text className="text-muted small">{f.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Tech stack */}
        <div className="mt-5 p-4 bg-white rounded shadow-sm">
          <h5 className="fw-bold mb-3">Tech Stack</h5>
          <Row className="g-2">
            {['React 19', 'React Router v7', 'React Bootstrap 2', 'Bootstrap 5', 'Vite 8'].map(tech => (
              <Col key={tech} xs="auto">
                <span className="badge bg-primary fs-6 px-3 py-2">{tech}</span>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  )
}
