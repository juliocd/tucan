import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SupplierDetails = ({ show, handleClose, supplier }) => {
  if (!supplier) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Supplier Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {supplier.id}</p>
        <p><strong>Name:</strong> {supplier.name}</p>
        <p><strong>Contact Info:</strong> {supplier.contact_info}</p>
        <p><strong>Lead Time:</strong> {supplier.lead_time} days</p>
        
        <p><strong>Created At:</strong> {new Date(supplier.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SupplierDetails;
