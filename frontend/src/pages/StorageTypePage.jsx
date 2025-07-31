import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import StorageTypeForm from '../components/StorageTypeForm';
import StorageTypeDetails from '../components/StorageTypeDetails';

const StorageTypePage = () => {
  const [storageTypes, setStorageTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStorageType, setSelectedStorageType] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [storageTypeToDelete, setStorageTypeToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchStorageTypes();
  }, []);

  const fetchStorageTypes = async () => {
    try {
      const response = await api.getStorageTypes();
      setStorageTypes(response.data);
    } catch (err) {
      setError('Failed to fetch storage types.');
    }
  };

  const handleSave = async (storageTypeData) => {
    try {
      if (storageTypeData.id) {
        await api.updateStorageType(storageTypeData.id, storageTypeData);
      } else {
        await api.createStorageType(storageTypeData);
      }
      fetchStorageTypes();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save storage type.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteStorageType(id);
      fetchStorageTypes();
      setShowConfirmModal(false);
    } catch (err) {
      setError('Failed to delete storage type.');
    }
  };

  const openConfirmModal = (id) => {
    setStorageTypeToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (storageType) => {
    setSelectedStorageType(storageType);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedStorageType(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-5">
      <h2>Storage Types</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={openCreateModal}>
        Create Storage Type
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storageTypes.map(storageType => (
            <tr key={storageType.id}>
              <td>{storageType.name}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(storageType)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedStorageType(storageType); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(storageType.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <StorageTypeForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        storageType={selectedStorageType}
        onSave={handleSave}
      />
      <StorageTypeDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        storageType={selectedStorageType}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this storage type?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(storageTypeToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StorageTypePage;
