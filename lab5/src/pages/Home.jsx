import React from 'react'
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const slides = [
  { img: '/images/slide1.jpg', title: 'Welcome to FoodNews', desc: 'Discover the latest food trends and delicious recipes from around the world.' },
  { img: '/images/slide2.jpg', title: 'Fresh & Delicious', desc: 'Explore fresh ingredients and amazing cooking techniques.' },
  { img: '/images/slide3.jpg', title: 'Test Your Knowledge', desc: 'Take our React & JavaScript quiz and see how much you know!' },
]

const quickLinks = [
  { to: '/news',    icon: '📰', title: 'Latest News',   desc: 'Browse all food news articles.' },
  { to: '/quiz',    icon: '🧠', title: 'Take a Quiz',   desc: 'Challenge yourself with React questions.' },
  { to: '/about',   icon: 'ℹ️',  title: 'About Us',     desc: 'Learn more about our platform.' },
  { to: '/contact', icon: '📬', title: 'Contact Us',    desc: 'Send us a message anytime.' },
]

export default function Home() {
  return (
    <div>
      {/* Slide */}
      <Carousel>
        {slides.map((s, i) => (
          <Carousel.Item key={i}>
            <img src={s.img} className="d-block w-100" alt={s.title} style={{ height: 480, objectFit: 'cover' }} />
            <Carousel.Caption>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Quick links */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4">Explore Our App</h2>
        <Row className="g-4">
          {quickLinks.map((item) => (
            <Col key={item.to} xs={12} sm={6} lg={3}>
              <Card className="h-100 text-center shadow-sm border-0">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{item.icon}</div>
                  <Card.Title className="fw-semibold">{item.title}</Card.Title>
                  <Card.Text className="text-muted small mb-3">{item.desc}</Card.Text>
                  <Button as={Link} to={item.to} variant="outline-primary" size="sm">Go →</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
