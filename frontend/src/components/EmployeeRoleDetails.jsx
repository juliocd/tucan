import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EmployeeRoleDetails = ({ show, handleClose, role }) => {
  if (!role) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee Role Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {role.id}</p>
        <p><strong>Name:</strong> {role.name}</p>
        <p><strong>Created At:</strong> {new Date(role.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeRoleDetails;
