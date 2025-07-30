import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import UnitForm from '../components/UnitForm';
import UnitDetails from '../components/UnitDetails';

const UnitPage = () => {
  const [units, setUnits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await api.getUnits();
      setUnits(response.data);
    } catch (err) {
      setError('Failed to fetch units.');
    }
  };

  const handleSave = async (unitData) => {
    try {
      if (unitData.id) {
        await api.updateUnit(unitData.id, unitData);
      } else {
        await api.createUnit(unitData);
      }
      fetchUnits();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save unit.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteUnit(id);
      fetchUnits();
      setShowConfirmModal(false);
    } catch (err) {
      setError('Failed to delete unit.');
    }
  };

  const openConfirmModal = (id) => {
    setUnitToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (unit) => {
    setSelectedUnit(unit);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedUnit(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-5">
      <h2>Units</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={openCreateModal}>
        Create Unit
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map(unit => (
            <tr key={unit.id}>
              <td>{unit.name}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(unit)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedUnit(unit); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(unit.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UnitForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        unit={selectedUnit}
        onSave={handleSave}
      />
      <UnitDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        unit={selectedUnit}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this unit?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(unitToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UnitPage;
