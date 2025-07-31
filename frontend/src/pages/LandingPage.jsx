import React from 'react';
// import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <Container fluid className="text-charcoal p-5">
      <header className="text-center mb-5">
        <h1 className="display-4 text-rusty">Simplify Inventory. Focus on Craft.</h1>
        <p className="lead">Tailored for Bakeries, Butchers, and Small Markets</p>
      </header>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <Card.Title><i className="fas fa-bread-slice"></i> Real-Time Tracking</Card.Title>
              <Card.Text>Keep your shelves stocked with live updates.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <Card.Title><i className="fas fa-drumstick-bite"></i> Smart Alerts</Card.Title>
              <Card.Text>Get notified before stock runs out.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <Card.Title><i className="fas fa-shopping-basket"></i> Multi-Shop Support</Card.Title>
              <Card.Text>Manage several stores seamlessly.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <section className="bg-light p-4 mt-5 text-center rounded">
        <h3 className="text-rusty mb-3">How It Works</h3>
        <p>Set up Tucan → Add inventory → Relax and monitor</p>
         <Link to="/signup">
          <Button className='btn-primary-olv w-20' variant="secondary">Join Now</Button>
        </Link>
      </section>

      <footer className="text-center mt-5">
        <p>Made with ❤️ for your craft. © Tucan 2025</p>
      </footer>
    </Container>
  );
};

export default LandingPage;
