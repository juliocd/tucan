import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const CategoryForm = ({ show, handleClose, category, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({ ...category });
    } else {
      setFormData({ name: '' });
    }
  }, [category]);

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
        <Modal.Title>{category ? 'Edit Category' : 'Create Category'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </Form.Group>
          <Button className='btn-primary-gr' variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryForm;
