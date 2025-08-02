import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../api';

const SubcategoryForm = ({ show, handleClose, subcategory, onSave }) => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (show) {
      if (subcategory) {
        setFormData({ ...subcategory });
      } else {
        setFormData({ name: '', category_id: '' });
      }
    }
  }, [subcategory, show]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    if (show) {
      fetchCategories();
    }
  }, [show]);

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
        <Modal.Title>{subcategory ? 'Edit Subcategory' : 'Create Subcategory'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category_id"
              value={formData.category_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button className='btn-primary-gr' variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SubcategoryForm;
