import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import api from '../api';

const SalesTransactionForm = ({ show, handleClose, salesTransaction, onSave }) => {
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (show) {
      if (salesTransaction) {
        setFormData({
          ...salesTransaction,
          date_time: salesTransaction.date_time ? salesTransaction.date_time.split('T')[0] : '',
        });
      } else {
        setFormData({
          date_time: '',
          product_id: '',
          quantity_sold: '',
          store_location_id: '',
          price_at_sale: '',
          employee_id: '',
        });
      }
      setFormError('');
    }
  }, [salesTransaction, show]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await api.getProducts();
        setProducts(productsRes.data);

        const storeLocationsRes = await api.getStoreLocations();
        setStoreLocations(storeLocationsRes.data);

        const employeesRes = await api.getEmployees();
        setEmployees(employeesRes.data);
      } catch (error) {
        console.error('Failed to fetch data for sales transaction form', error);
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
    setFormError('');

    // Convert date string to ISO 8601 format for Django DateTimeField
    const dataToSave = { ...formData };
    if (dataToSave.date_time) {
      dataToSave.date_time = `${dataToSave.date_time}T00:00:00Z`;
    }

    onSave(dataToSave);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{salesTransaction ? 'Edit Sales Transaction' : 'Create Sales Transaction'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formError && <Alert variant="danger">{formError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control type="date" name="date_time" value={formData.date_time ? formData.date_time.split('T')[0] : ''} onChange={handleChange} />
          </Form.Group>
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
            <Form.Label>Quantity Sold</Form.Label>
            <Form.Control type="number" name="quantity_sold" value={formData.quantity_sold || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Store Location</Form.Label>
            <Form.Select
              name="store_location_id"
              value={formData.store_location_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Store Location</option>
              {storeLocations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.store_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price at Sale</Form.Label>
            <Form.Control type="number" name="price_at_sale" value={formData.price_at_sale || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Employee</Form.Label>
            <Form.Select
              name="employee_id"
              value={formData.employee_id || ''}
              onChange={handleChange}
            >
              <option value="">Select an Employee</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SalesTransactionForm;