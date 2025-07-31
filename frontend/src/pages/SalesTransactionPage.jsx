import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import SalesTransactionForm from '../components/SalesTransactionForm';
import SalesTransactionDetails from '../components/SalesTransactionDetails';

const SalesTransactionPage = () => {
  const [salesTransactions, setSalesTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSalesTransaction, setSelectedSalesTransaction] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [salesTransactionToDelete, setSalesTransactionToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchSalesTransactions();
    fetchProducts();
    fetchStoreLocations();
    fetchEmployees();
  }, []);

  const fetchSalesTransactions = async () => {
    try {
      const response = await api.getSalesTransactions();
      setSalesTransactions(response.data);
    } catch (err) {
      setError('Failed to fetch sales transactions.');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const fetchStoreLocations = async () => {
    try {
      const response = await api.getStoreLocations();
      setStoreLocations(response.data);
    } catch (err) {
      console.error('Failed to fetch store locations', err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.getEmployees();
      setEmployees(response.data);
    } catch (err) {
      console.error('Failed to fetch employees', err);
    }
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown';
  };

  const getStoreLocationName = (locationId) => {
    const location = storeLocations.find(l => l.id === locationId);
    return location ? location.store_name : 'Unknown';
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  const handleSave = async (salesTransactionData) => {
    try {
      if (salesTransactionData.id) {
        await api.updateSalesTransaction(salesTransactionData.id, salesTransactionData);
      } else {
        await api.createSalesTransaction(salesTransactionData);
      }
      fetchSalesTransactions();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save sales transaction.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteSalesTransaction(id);
      fetchSalesTransactions();
      setShowConfirmModal(false);
    } catch (err) {
      setError('Failed to delete sales transaction.');
    }
  };

  const openConfirmModal = (id) => {
    setSalesTransactionToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (salesTransaction) => {
    setSelectedSalesTransaction(salesTransaction);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedSalesTransaction(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-5">
      <h2>Sales Transactions</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={openCreateModal}>
        Create Sales Transaction
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salesTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date_time).toLocaleDateString()}</td>
              <td>{getProductName(transaction.product_id)}</td>
              <td>{transaction.quantity_sold}</td>
              <td>{transaction.price_at_sale}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(transaction)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedSalesTransaction(transaction); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(transaction.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <SalesTransactionForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        salesTransaction={selectedSalesTransaction}
        onSave={handleSave}
      />
      <SalesTransactionDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        salesTransaction={selectedSalesTransaction}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this sales transaction?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(salesTransactionToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SalesTransactionPage;
