import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const SupplierForm = ({ show, handleClose, supplier, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (show) {
      if (supplier) {
        setFormData({ ...supplier });
      } else {
        setFormData({ name: '', contact_info: '', lead_time: '' });
      }
    }
  }, [supplier, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{supplier ? 'Edit Supplier' : 'Create Supplier'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Info</Form.Label>
            <Form.Control type="text" name="contact_info" value={formData.contact_info || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Lead Time (days)</Form.Label>
            <Form.Control type="number" name="lead_time" value={formData.lead_time || ''} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SupplierForm;
