import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import ProductForm from '../components/ProductForm';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products.');
    }
  };

  const handleSave = async (productData) => {
    try {
      if (productData.id) {
        await api.updateProduct(productData.id, productData);
      } else {
        await api.createProduct(productData);
      }
      fetchProducts();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteProduct(id);
      fetchProducts();
      setShowConfirmModal(false);
    } catch (err) {
      setError('Failed to delete product.');
    }
  };

  const openConfirmModal = (id) => {
    setProductToDelete(id);
    setShowConfirmModal(true);
  };

  return (
    <Container className="mt-5">
      <h2>Products</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => { setSelectedProduct(null); setShowModal(true); }}>
        Create Product
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <Button variant="info" onClick={() => { setSelectedProduct(product); setShowModal(true); }}>Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(product.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ProductForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        product={selectedProduct}
        onSave={handleSave}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(productToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductPage;