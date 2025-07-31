import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const StorageTypeDetails = ({ show, handleClose, storageType }) => {
  if (!storageType) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Storage Type Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {storageType.id}</p>
        <p><strong>Name:</strong> {storageType.name}</p>
        <p><strong>Created At:</strong> {new Date(storageType.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StorageTypeDetails;
