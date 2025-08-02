import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import InventoryForm from '../components/InventoryForm';
import InventoryDetails from '../components/InventoryDetails';

const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [inventoryToDelete, setInventoryToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchInventoryItems();
    fetchProducts();
    fetchStoreLocations();
  }, []);

  const fetchInventoryItems = async () => {
    try {
      const response = await api.getInventory();
      setInventoryItems(response.data);
    } catch (error) {
      setError('Failed to fetch inventory items.');
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

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown';
  };

  const getLocationName = (locationId) => {
    const location = storeLocations.find(l => l.id === locationId);
    return location ? location.store_name : 'Unknown';
  };

  const handleSave = async (inventoryData) => {
    try {
      if (inventoryData.id) {
        await api.updateInventory(inventoryData.id, inventoryData);
      } else {
        await api.createInventory(inventoryData);
      }
      fetchInventoryItems();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to save inventory item:', error);
      setError(`Failed to save inventory item: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteInventory(id);
      fetchInventoryItems();
      setShowConfirmModal(false);
    } catch (error) {
      setError('Failed to delete inventory item.');
    }
  };

  const openConfirmModal = (id) => {
    setInventoryToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (inventory) => {
    setSelectedInventory(inventory);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedInventory(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-2">
      <h2 className='text-rusty'>Inventory</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="d-flex justify-content-end w-100">
        <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
          Add Inventory Item
        </Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Product</th>
            <th>Location</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map(item => (
            <tr key={item.id}>
              <td>{getProductName(item.product_id)}</td>
              <td>{getLocationName(item.location_id)}</td>
              <td>{item.quantity_available}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(item)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedInventory(item); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(item.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <InventoryForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        inventory={selectedInventory}
        onSave={handleSave}
      />
      <InventoryDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        inventory={selectedInventory}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this inventory item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(inventoryToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default InventoryPage;
