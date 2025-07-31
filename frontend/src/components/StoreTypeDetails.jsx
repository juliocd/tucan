import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const StoreTypeDetails = ({ show, handleClose, storeType }) => {
  if (!storeType) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Store Type Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {storeType.id}</p>
        <p><strong>Name:</strong> {storeType.name}</p>
        <p><strong>Created At:</strong> {new Date(storeType.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoreTypeDetails;
