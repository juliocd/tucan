import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../api';

const InventoryDetails = ({ show, handleClose, inventory }) => {
  const [productName, setProductName] = useState('');
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (inventory) {
        try {
          const productsRes = await api.getProducts();
          const product = productsRes.data.find(p => p.id === inventory.product_id);
          if (product) setProductName(product.name);

          const locationsRes = await api.getStoreLocations();
          const location = locationsRes.data.find(l => l.id === inventory.location_id);
          if (location) setLocationName(location.store_name);

        } catch (error) {
          console.error('Failed to fetch related data for inventory details', error);
        }
      }
    };

    if (show) {
      fetchData();
    }
  }, [inventory, show]);

  if (!inventory) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Inventory Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {inventory.id}</p>
        <p><strong>Product:</strong> {productName}</p>
        <p><strong>Location:</strong> {locationName}</p>
        <p><strong>Quantity Available:</strong> {inventory.quantity_available}</p>
        <p><strong>Date Received:</strong> {new Date(inventory.date_received).toLocaleDateString()}</p>
        <p><strong>Expiration Date:</strong> {new Date(inventory.expiration_date).toLocaleDateString()}</p>
        <p><strong>Batch Number:</strong> {inventory.batch_number}</p>
        <p><strong>Account ID:</strong> {inventory.account_id}</p>
        <p><strong>Created At:</strong> {new Date(inventory.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InventoryDetails;
