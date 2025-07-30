import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const StoreLocationDetails = ({ show, handleClose, storeLocation }) => {
  if (!storeLocation) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Store Location Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {storeLocation.id}</p>
        <p><strong>Store Name:</strong> {storeLocation.store_name}</p>
        <p><strong>Store Type ID:</strong> {storeLocation.store_type_id}</p>
        <p><strong>Address:</strong> {storeLocation.address}</p>
        <p><strong>Contact Info:</strong> {storeLocation.contact_info}</p>
        <p><strong>Account ID:</strong> {storeLocation.account_id}</p>
        <p><strong>Created At:</strong> {new Date(storeLocation.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoreLocationDetails;
