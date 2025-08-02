import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import SubcategoryForm from '../components/SubcategoryForm';
import SubcategoryDetails from '../components/SubcategoryDetails';

const SubcategoryPage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await api.getSubcategories();
      setSubcategories(response.data);
    } catch (error) {
      setError('Failed to fetch subcategories.');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories();
      setCategories(response.data);
    } catch (error) {
      setError('Failed to fetch categories.');
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleSave = async (subcategoryData) => {
    try {
      if (subcategoryData.id) {
        await api.updateSubcategory(subcategoryData.id, subcategoryData);
      } else {
        await api.createSubcategory(subcategoryData);
      }
      fetchSubcategories();
      setShowModal(false);
    } catch (error) {
      setError('Failed to save subcategory.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteSubcategory(id);
      fetchSubcategories();
      setShowConfirmModal(false);
    } catch (error) {
      setError('Failed to delete subcategory.');
    }
  };

  const openConfirmModal = (id) => {
    setSubcategoryToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedSubcategory(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-2">
      <h2 className='text-rusty'>Subcategories</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="d-flex justify-content-end w-100">
        <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
          Create Subcategory
        </Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map(subcategory => (
            <tr key={subcategory.id}>
              <td>{subcategory.name}</td>
              <td>{getCategoryName(subcategory.category_id)}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(subcategory)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedSubcategory(subcategory); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(subcategory.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <SubcategoryForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        subcategory={selectedSubcategory}
        onSave={handleSave}
      />
      <SubcategoryDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        subcategory={selectedSubcategory}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this subcategory?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(subcategoryToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SubcategoryPage;