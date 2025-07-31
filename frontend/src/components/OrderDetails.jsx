import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../api';

const OrderDetails = ({ show, handleClose, order }) => {
  const [productName, setProductName] = useState('');
  const [supplierName, setSupplierName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (order) {
        try {
          const productsRes = await api.getProducts();
          const product = productsRes.data.find(p => p.id === order.product_id);
          if (product) setProductName(product.name);

          const suppliersRes = await api.getSuppliers();
          const supplier = suppliersRes.data.find(s => s.id === order.supplier_id);
          if (supplier) setSupplierName(supplier.name);

        } catch (error) {
          console.error('Failed to fetch related data for order details', error);
        }
      }
    };

    if (show) {
      fetchData();
    }
  }, [order, show]);

  if (!order) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Product:</strong> {productName}</p>
        <p><strong>Supplier:</strong> {supplierName}</p>
        <p><strong>Date and Time:</strong> {new Date(order.date_time).toLocaleString()}</p>
        <p><strong>Expected Delivery:</strong> {new Date(order.expected_delivery).toLocaleString()}</p>
        <p><strong>Quantity Ordered:</strong> {order.quantity_ordered}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Account ID:</strong> {order.account_id}</p>
        <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetails;
