import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const StoreLocationTypeDetails = ({ show, handleClose, storeLocationType }) => {
  if (!storeLocationType) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Store Location Type Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {storeLocationType.id}</p>
        <p><strong>Name:</strong> {storeLocationType.name}</p>
        <p><strong>Created At:</strong> {new Date(storeLocationType.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoreLocationTypeDetails;
