import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CategoryDetails = ({ show, handleClose, category }) => {
  if (!category) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Category Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {category.id}</p>
        <p><strong>Name:</strong> {category.name}</p>
        <p><strong>Account ID:</strong> {category.account_id}</p>
        <p><strong>Created At:</strong> {new Date(category.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryDetails;
