import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../api';

const StoreLocationDetails = ({ show, handleClose, storeLocation }) => {
  const [storeTypeName, setStoreTypeName] = useState('');

  useEffect(() => {
    const fetchStoreTypeName = async () => {
      if (storeLocation) {
        try {
          const response = await api.getStoreTypes();
          const storeType = response.data.find(type => type.id === storeLocation.store_type_id);
          if (storeType) {
            setStoreTypeName(storeType.name);
          }
        } catch (error) {
          console.error('Failed to fetch store type name', error);
        }
      }
    };

    if (show) {
      fetchStoreTypeName();
    }
  }, [storeLocation, show]);

  if (!storeLocation) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Store Location Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {storeLocation.id}</p>
        <p><strong>Store Name:</strong> {storeLocation.store_name}</p>
        <p><strong>Store Type:</strong> {storeTypeName}</p>
        <p><strong>Address:</strong> {storeLocation.address}</p>
        <p><strong>Contact Info:</strong> {storeLocation.contact_info}</p>
        <p><strong>Account ID:</strong> {storeLocation.account_id}</p>
        <p><strong>Created At:</strong> {new Date(storeLocation.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoreLocationDetails;