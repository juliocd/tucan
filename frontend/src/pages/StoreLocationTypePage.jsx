import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import StoreLocationTypeForm from '../components/StoreLocationTypeForm';
import StoreLocationTypeDetails from '../components/StoreLocationTypeDetails';

const StoreLocationTypePage = () => {
  const [storeLocationTypes, setStoreLocationTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStoreLocationType, setSelectedStoreLocationType] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [storeLocationTypeToDelete, setStoreLocationTypeToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchStoreLocationTypes();
  }, []);

  const fetchStoreLocationTypes = async () => {
    try {
      const response = await api.getStoreLocationTypes();
      setStoreLocationTypes(response.data);
    } catch (err) {
      setError('Failed to fetch store location types.');
    }
  };

  const handleSave = async (storeLocationTypeData) => {
    try {
      if (storeLocationTypeData.id) {
        await api.updateStoreLocationType(storeLocationTypeData.id, storeLocationTypeData);
      } else {
        await api.createStoreLocationType(storeLocationTypeData);
      }
      fetchStoreLocationTypes();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save store location type.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteStoreLocationType(id);
      fetchStoreLocationTypes();
      setShowConfirmModal(false);
    } catch (err) {
      setError('Failed to delete store location type.');
    }
  };

  const openConfirmModal = (id) => {
    setStoreLocationTypeToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (storeLocationType) => {
    setSelectedStoreLocationType(storeLocationType);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedStoreLocationType(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-5">
      <h2>Store Location Types</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={openCreateModal}>
        Create Store Location Type
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storeLocationTypes.map(storeLocationType => (
            <tr key={storeLocationType.id}>
              <td>{storeLocationType.name}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(storeLocationType)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedStoreLocationType(storeLocationType); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(storeLocationType.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <StoreLocationTypeForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        storeLocationType={selectedStoreLocationType}
        onSave={handleSave}
      />
      <StoreLocationTypeDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        storeLocationType={selectedStoreLocationType}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this store location type?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(storeLocationTypeToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StoreLocationTypePage;
