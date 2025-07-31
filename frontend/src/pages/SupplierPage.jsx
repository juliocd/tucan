import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import SupplierForm from '../components/SupplierForm';
import SupplierDetails from '../components/SupplierDetails';

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.getSuppliers();
      setSuppliers(response.data);
    } catch (err) {
      setError('Failed to fetch suppliers.');
    }
  };

  const handleSave = async (supplierData) => {
    try {
      if (supplierData.id) {
        await api.updateSupplier(supplierData.id, supplierData);
      } else {
        await api.createSupplier(supplierData);
      }
      fetchSuppliers();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save supplier.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteSupplier(id);
      fetchSuppliers();
      setShowConfirmModal(false);
    } catch (err) {
      setError('Failed to delete supplier.');
    }
  };

  const openConfirmModal = (id) => {
    setSupplierToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (supplier) => {
    setSelectedSupplier(supplier);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedSupplier(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-5">
      <h2>Suppliers</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={openCreateModal}>
        Create Supplier
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Info</th>
            <th>Lead Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.contact_info}</td>
              <td>{supplier.lead_time}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(supplier)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedSupplier(supplier); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(supplier.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <SupplierForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        supplier={selectedSupplier}
        onSave={handleSave}
      />
      <SupplierDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        supplier={selectedSupplier}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this supplier?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(supplierToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SupplierPage;
