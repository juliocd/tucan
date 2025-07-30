import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <h1>Welcome to Tucan</h1>
      <p>Your inventory management solution.</p>
      <div>
        <Link to="/login">
          <Button variant="primary" className="me-2">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="secondary">Sign Up</Button>
        </Link>
      </div>
    </Container>
  );
};

export default LandingPage;
