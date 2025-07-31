import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import StoreTypeForm from '../components/StoreTypeForm';
import StoreTypeDetails from '../components/StoreTypeDetails';

const StoreTypePage = () => {
  const [storeTypes, setStoreTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStoreType, setSelectedStoreType] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [storeTypeToDelete, setStoreTypeToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchStoreTypes();
  }, []);

  const fetchStoreTypes = async () => {
    try {
      const response = await api.getStoreTypes();
      setStoreTypes(response.data);
    } catch (err) {
      setError('Failed to fetch store types.');
    }
  };

  const handleSave = async (storeTypeData) => {
    try {
      if (storeTypeData.id) {
        await api.updateStoreType(storeTypeData.id, storeTypeData);
      } else {
        await api.createStoreType(storeTypeData);
      }
      fetchStoreTypes();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save store type.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteStoreType(id);
      fetchStoreTypes();
      setShowConfirmModal(false);
    } catch (err) {
      setError('Failed to delete store type.');
    }
  };

  const openConfirmModal = (id) => {
    setStoreTypeToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (storeType) => {
    setSelectedStoreType(storeType);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedStoreType(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-5">
      <h2>Store Types</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={openCreateModal}>
        Create Store Type
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storeTypes.map(storeType => (
            <tr key={storeType.id}>
              <td>{storeType.name}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(storeType)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedStoreType(storeType); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(storeType.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <StoreTypeForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        storeType={selectedStoreType}
        onSave={handleSave}
      />
      <StoreTypeDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        storeType={selectedStoreType}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this store type?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(storeTypeToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StoreTypePage;
