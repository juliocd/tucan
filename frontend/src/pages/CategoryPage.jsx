import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import CategoryForm from '../components/CategoryForm';
import CategoryDetails from '../components/CategoryDetails';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories();
      setCategories(response.data);
    } catch (_error) {
      setError('Failed to fetch categories.');
    }
  };

  const handleSave = async (categoryData) => {
    try {
      if (categoryData.id) {
        await api.updateCategory(categoryData.id, categoryData);
      } else {
        await api.createCategory(categoryData);
      }
      fetchCategories();
      setShowModal(false);
    } catch (error) {
      setError('Failed to save category.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteCategory(id);
      fetchCategories();
      setShowConfirmModal(false);
    } catch (error) {
      setError('Failed to delete category.');
    }
  };

  const openConfirmModal = (id) => {
    setCategoryToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (category) => {
    setSelectedCategory(category);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedCategory(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-2">
      <h2 className='text-rusty'>Categories</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="d-flex justify-content-end w-100">
        <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
          Create Category
        </Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(category)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedCategory(category); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(category.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CategoryForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        category={selectedCategory}
        onSave={handleSave}
      />
      <CategoryDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        category={selectedCategory}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(categoryToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CategoryPage;