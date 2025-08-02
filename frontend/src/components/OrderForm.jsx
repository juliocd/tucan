import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import api from '../api';

const OrderForm = ({ show, handleClose, order, onSave }) => {
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (show) {
      if (order) {
        setFormData({
          ...order,
          date_time: order.date_time ? order.date_time.split('T')[0] : '',
          expected_delivery: order.expected_delivery ? order.expected_delivery.split('T')[0] : '',
        });
      } else {
        setFormData({
          product_id: '',
          supplier_id: '',
          date_time: '',
          expected_delivery: '',
          quantity_ordered: '',
          status: '',
        });
      }
      setFormError('');
    }
  }, [order, show]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await api.getProducts();
        setProducts(productsRes.data);

        const suppliersRes = await api.getSuppliers();
        setSuppliers(suppliersRes.data);
      } catch (error) {
        console.error('Failed to fetch data for order form', error);
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

    // Convert date strings to ISO 8601 format for Django DateTimeField
    const dataToSave = { ...formData };
    if (dataToSave.date_time) {
      dataToSave.date_time = `${dataToSave.date_time}T00:00:00Z`;
    }
    if (dataToSave.expected_delivery) {
      dataToSave.expected_delivery = `${dataToSave.expected_delivery}T00:00:00Z`;
    }

    onSave(dataToSave);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{order ? 'Edit Order' : 'Create Order'}</Modal.Title>
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
            <Form.Label>Supplier</Form.Label>
            <Form.Select
              name="supplier_id"
              value={formData.supplier_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control type="date" name="date_time" value={formData.date_time ? formData.date_time.split('T')[0] : ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Expected Delivery</Form.Label>
            <Form.Control type="date" name="expected_delivery" value={formData.expected_delivery ? formData.expected_delivery.split('T')[0] : ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity Ordered</Form.Label>
            <Form.Control type="number" name="quantity_ordered" value={formData.quantity_ordered || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" name="status" value={formData.status || ''} onChange={handleChange} />
          </Form.Group>
          <Button className='btn-primary-gr' variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderForm;
