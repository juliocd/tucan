import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const StoreLocationTypeForm = ({ show, handleClose, storeLocationType, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (show) {
      if (storeLocationType) {
        setFormData({ ...storeLocationType });
      } else {
        setFormData({ name: '' });
      }
    }
  }, [storeLocationType, show]);

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
        <Modal.Title>{storeLocationType ? 'Edit Store Location Type' : 'Create Store Location Type'}</Modal.Title>
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

export default StoreLocationTypeForm;
