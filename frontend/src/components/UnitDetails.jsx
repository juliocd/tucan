import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UnitDetails = ({ show, handleClose, unit }) => {
  if (!unit) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Unit Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {unit.id}</p>
        <p><strong>Name:</strong> {unit.name}</p>
        <p><strong>Created At:</strong> {new Date(unit.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UnitDetails;
