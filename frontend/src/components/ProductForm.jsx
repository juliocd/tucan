import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ProductForm = ({ show, handleClose, product, onSave }) => {
  const [formData, setFormData] = useState({ ...product });

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

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
        <Modal.Title>{product ? 'Edit Product' : 'Create Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </Form.Group>
          {/* TODO: Replace these with dropdowns */}
          <Form.Group className="mb-3">
            <Form.Label>Category ID</Form.Label>
            <Form.Control type="text" name="category_id" value={formData.category_id || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subcategory ID</Form.Label>
            <Form.Control type="text" name="subcategory_id" value={formData.subcategory_id || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unit ID</Form.Label>
            <Form.Control type="text" name="unit_id" value={formData.unit_id || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Supplier ID</Form.Label>
            <Form.Control type="text" name="supplier_id" value={formData.supplier_id || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Storage Type ID</Form.Label>
            <Form.Control type="text" name="storage_type_id" value={formData.storage_type_id || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={formData.price || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Shelf Life (days)</Form.Label>
            <Form.Control type="number" name="shelf_life" value={formData.shelf_life || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Reorder Threshold</Form.Label>
            <Form.Control type="number" name="reorder_threshold" value={formData.reorder_threshold || ''} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
