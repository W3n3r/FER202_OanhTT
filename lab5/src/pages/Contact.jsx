import React, { useState } from 'react'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim())    errs.name    = 'Please enter your name.'
    if (!form.email.trim())   errs.email   = 'Please enter your email.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address.'
    if (!form.subject.trim()) errs.subject = 'Please enter a subject.'
    if (!form.message.trim()) errs.message = 'Please enter your message.'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setErrors({})
  }

  return (
    <Container className="py-5">
      <div className="contact-wrapper">
        <h2 className="fw-bold mb-1">Contact Us</h2>
        <p className="text-muted mb-4">Fill out the form below and we'll get back to you soon.</p>

        {submitted && (
          <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
            ✅ Message sent successfully! We'll reply as soon as possible.
          </Alert>
        )}

        <div className="bg-white p-4 rounded shadow-sm">
          <Form onSubmit={handleSubmit} noValidate>
            <Row className="g-3">
              <Col xs={12} sm={6}>
                <Form.Group controlId="contactName">
                  <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Group controlId="contactEmail">
                  <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="contactSubject">
                  <Form.Label>Subject <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={handleChange}
                    isInvalid={!!errors.subject}
                  />
                  <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="contactMessage">
                  <Form.Label>Message <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Button type="submit" variant="primary" className="px-4">
                  Send Message
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Container>
  )
}
