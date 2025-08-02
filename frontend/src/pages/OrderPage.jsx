import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import OrderForm from '../components/OrderForm';
import OrderDetails from '../components/OrderDetails';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.getOrders();
      setOrders(response.data);
    } catch (error) {
      setError('Failed to fetch orders.');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await api.getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error('Failed to fetch suppliers', error);
    }
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown';
  };

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : 'Unknown';
  };

  const handleSave = async (orderData) => {
    try {
      if (orderData.id) {
        await api.updateOrder(orderData.id, orderData);
      } else {
        await api.createOrder(orderData);
      }
      fetchOrders();
      setShowModal(false);
    } catch (error) {
      setError('Failed to save order.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteOrder(id);
      fetchOrders();
      setShowConfirmModal(false);
    } catch (error) {
      setError('Failed to delete order.');
    }
  };

  const openConfirmModal = (id) => {
    setOrderToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedOrder(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-2">
      <h2 className='text-rusty'>Orders</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="d-flex justify-content-end w-100">
        <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
          Create Order
        </Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{getProductName(order.product_id)}</td>
              <td>{getSupplierName(order.supplier_id)}</td>
              <td>{order.quantity_ordered}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(order)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedOrder(order); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(order.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <OrderForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        order={selectedOrder}
        onSave={handleSave}
      />
      <OrderDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        order={selectedOrder}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(orderToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderPage;
