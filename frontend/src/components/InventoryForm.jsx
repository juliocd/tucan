import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import api from '../api';

const InventoryForm = ({ show, handleClose, inventory, onSave }) => {
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (show) {
      if (inventory) {
        setFormData({
          ...inventory,
          date_received: inventory.date_received ? inventory.date_received.split('T')[0] : '',
          expiration_date: inventory.expiration_date ? inventory.expiration_date.split('T')[0] : '',
        });
      } else {
        setFormData({
          product_id: '',
          location_id: '',
          quantity_available: '',
          date_received: '',
          expiration_date: '',
          batch_number: '',
        });
      }
      setFormError(''); // Clear previous errors when modal opens
    }
  }, [inventory, show]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await api.getProducts();
        setProducts(productsRes.data);

        const storeLocationsRes = await api.getStoreLocations();
        setStoreLocations(storeLocationsRes.data);
      } catch (error) {
        console.error('Failed to fetch data for inventory form', error);
      }
    };
    if (show) {
      fetchData();
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous errors

    if (formData.date_received && formData.expiration_date) {
      const receivedDate = new Date(formData.date_received);
      const expirationDate = new Date(formData.expiration_date);

      if (expirationDate <= receivedDate) {
        setFormError('Expiration Date cannot be before or equal to Date Received.');
        return;
      }
    }

    // Convert date strings to ISO 8601 format for Django DateTimeField
    const dataToSave = { ...formData };
    if (dataToSave.date_received) {
      dataToSave.date_received = `${dataToSave.date_received}T00:00:00Z`;
    }
    if (dataToSave.expiration_date) {
      dataToSave.expiration_date = `${dataToSave.expiration_date}T00:00:00Z`;
    }

    onSave(dataToSave);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{inventory ? 'Edit Inventory' : 'Create Inventory'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formError && <Alert variant="danger">{formError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product</Form.Label>
            <Form.Select
              name="product_id"
              value={formData.product_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Select
              name="location_id"
              value={formData.location_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Location</option>
              {storeLocations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.store_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity Available</Form.Label>
            <Form.Control type="number" name="quantity_available" value={formData.quantity_available || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Received</Form.Label>
            <Form.Control type="date" name="date_received" value={formData.date_received ? formData.date_received.split('T')[0] : ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control type="date" name="expiration_date" value={formData.expiration_date ? formData.expiration_date.split('T')[0] : ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Batch Number</Form.Label>
            <Form.Control type="text" name="batch_number" value={formData.batch_number || ''} onChange={handleChange} />
          </Form.Group>
          <Button className='btn-primary-gr' variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InventoryForm;
