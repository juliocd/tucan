import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const StoreTypeForm = ({ show, handleClose, storeType, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (show) {
      if (storeType) {
        setFormData({ ...storeType });
      } else {
        setFormData({ name: '' });
      }
    }
  }, [storeType, show]);

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
        <Modal.Title>{storeType ? 'Edit Store Type' : 'Create Store Type'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StoreTypeForm;
