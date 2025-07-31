import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../api';

const SalesTransactionDetails = ({ show, handleClose, salesTransaction }) => {
  const [productName, setProductName] = useState('');
  const [storeLocationName, setStoreLocationName] = useState('');
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (salesTransaction) {
        try {
          const productsRes = await api.getProducts();
          const product = productsRes.data.find(p => p.id === salesTransaction.product_id);
          if (product) setProductName(product.name);

          const storeLocationsRes = await api.getStoreLocations();
          const storeLocation = storeLocationsRes.data.find(sl => sl.id === salesTransaction.store_location_id);
          if (storeLocation) setStoreLocationName(storeLocation.store_name);

          const employeesRes = await api.getEmployees();
          const employee = employeesRes.data.find(e => e.id === salesTransaction.employee_id);
          if (employee) setEmployeeName(employee.name);

        } catch (error) {
          console.error('Failed to fetch related data for sales transaction details', error);
        }
      }
    };

    if (show) {
      fetchData();
    }
  }, [salesTransaction, show]);

  if (!salesTransaction) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sales Transaction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {salesTransaction.id}</p>
        <p><strong>Date and Time:</strong> {new Date(salesTransaction.date_time).toLocaleString()}</p>
        <p><strong>Product:</strong> {productName}</p>
        <p><strong>Quantity Sold:</strong> {salesTransaction.quantity_sold}</p>
        <p><strong>Store Location:</strong> {storeLocationName}</p>
        <p><strong>Price at Sale:</strong> {salesTransaction.price_at_sale}</p>
        <p><strong>Employee:</strong> {employeeName}</p>
        <p><strong>Account ID:</strong> {salesTransaction.account_id}</p>
        <p><strong>Created At:</strong> {new Date(salesTransaction.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SalesTransactionDetails;
