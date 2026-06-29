import React from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'

const newLists = [
  { id: 1, title: "Woman bakes expletive-laden pies to 'get a rise' out of her grandmother in annual tradition", description: '"What started as a means to get a rise out of my Grammy has snowballed into a weird family tradition," wrote Jess Lydon.', images: 'images/event-1.jpg' },
  { id: 2, title: 'Martha Stewart shows off her 30 pies after canceled Thanksgiving dinner plans', description: 'Queen of Thanksgiving Martha Stewart may not be hosting a turkey dinner this year but fret not, she will still be celebrating with literally 30 pies.', images: 'images/event-2.jpg' },
  { id: 3, title: 'Burger King is testing a new breakfast sandwich', description: 'This is a win for the flatbread fans.', images: 'images/event-3.jpg' },
  { id: 4, title: 'Popeyes permanently adds chicken wings to its menu', description: "And you can get 'em in five different flavors.", images: 'images/event-4.jpg' },
  { id: 5, title: 'Top salmon with a sizzling mix of aromatics and spices', description: 'Tadka is a ubiquitous South Asian technique that adds a dramatic last-minute coat of flavor.', images: 'images/event-5.jpg' },
  { id: 6, title: '80 Christmas dinner ideas for the ultimate holiday feast', description: 'Build the perfect Christmas menu with these delicious recipes.', images: 'images/event-6.jpg' },
  { id: 7, title: 'How to make the easiest prime rib roast for the holidays', description: 'Use these tips and tricks to make a juicy and amazingly delicious prime rib roast.', images: 'images/event-7.jpg' },
  { id: 8, title: 'Turn leftover turkey into a flavorful Waldorf salad', description: 'This light, bright turkey salad is the best post-Thanksgiving lunch.', images: 'images/event-8.jpg' },
]

function NewsCard({ item }) {
  return (
    <Card className="h-100 shadow-sm news-card border-0">
      <Card.Img variant="top" src={`/${item.images}`} alt={item.title} />
      <Card.Body className="d-flex flex-column">
        <Badge bg="warning" text="dark" className="mb-2 align-self-start">Food &amp; Drink</Badge>
        <Card.Title className="card-title">{item.title}</Card.Title>
        <Card.Text className="card-text flex-grow-1">{item.description}</Card.Text>
        <a href="#" className="btn btn-sm btn-outline-secondary mt-2" onClick={e => e.preventDefault()}>
          Read more →
        </a>
      </Card.Body>
    </Card>
  )
}

export default function News() {
  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-1">Latest News</h2>
      <p className="text-muted mb-4">{newLists.length} articles available</p>
      <Row className="g-4">
        {newLists.map(item => (
          <Col key={item.id} xs={12} sm={6} lg={3}>
            <NewsCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
