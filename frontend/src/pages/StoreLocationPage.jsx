import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import StoreLocationForm from '../components/StoreLocationForm';
import StoreLocationDetails from '../components/StoreLocationDetails';

const StoreLocationPage = () => {
  const [storeLocations, setStoreLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStoreLocation, setSelectedStoreLocation] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [storeLocationToDelete, setStoreLocationToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchStoreLocations();
  }, []);

  const fetchStoreLocations = async () => {
    try {
      const response = await api.getStoreLocations();
      setStoreLocations(response.data);
    } catch (error) {
      setError('Failed to fetch store locations.');
    }
  };

  const handleSave = async (storeLocationData) => {
    try {
      if (storeLocationData.id) {
        await api.updateStoreLocation(storeLocationData.id, storeLocationData);
      } else {
        await api.createStoreLocation(storeLocationData);
      }
      fetchStoreLocations();
      setShowModal(false);
    } catch (error) {
      setError('Failed to save store location.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteStoreLocation(id);
      fetchStoreLocations();
      setShowConfirmModal(false);
    } catch (error) {
      setError('Failed to delete store location.');
    }
  };

  const openConfirmModal = (id) => {
    setStoreLocationToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (storeLocation) => {
    setSelectedStoreLocation(storeLocation);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedStoreLocation(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-2">
      <h2 className='text-rusty'>Store Locations</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="d-flex justify-content-end w-100">
        <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
          Create Store Location
        </Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storeLocations.map(storeLocation => (
            <tr key={storeLocation.id}>
              <td>{storeLocation.store_name}</td>
              <td>{storeLocation.address}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(storeLocation)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedStoreLocation(storeLocation); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(storeLocation.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <StoreLocationForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        storeLocation={selectedStoreLocation}
        onSave={handleSave}
      />
      <StoreLocationDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        storeLocation={selectedStoreLocation}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this store location?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(storeLocationToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StoreLocationPage;
