import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../api';

const SubcategoryDetails = ({ show, handleClose, subcategory }) => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryName = async () => {
      if (subcategory) {
        try {
          const response = await api.getCategories();
          const category = response.data.find(cat => cat.id === subcategory.category_id);
          if (category) {
            setCategoryName(category.name);
          }
        } catch (error) {
          console.error('Failed to fetch category name', error);
        }
      }
    };

    if (show) {
      fetchCategoryName();
    }
  }, [subcategory, show]);

  if (!subcategory) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Subcategory Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {subcategory.id}</p>
        <p><strong>Name:</strong> {subcategory.name}</p>
        <p><strong>Category:</strong> {categoryName}</p>
        <p><strong>Created At:</strong> {new Date(subcategory.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubcategoryDetails;