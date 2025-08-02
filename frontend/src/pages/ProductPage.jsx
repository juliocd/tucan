import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import ProductForm from '../components/ProductForm';
import ProductDetails from '../components/ProductDetails';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      setProducts(response.data);
    } catch (error) {
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
    } catch (error) {
      setError('Failed to save product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteProduct(id);
      fetchProducts();
      setShowConfirmModal(false);
    } catch (error) {
      setError('Failed to delete product.');
    }
  };

  const openConfirmModal = (id) => {
    setProductToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedProduct(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-2">
      <h2 className='text-rusty'>Products</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="d-flex justify-content-end w-100">
        <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
          Create Product
        </Button>
      </div>
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
                <Button variant="secondary" onClick={() => openDetailsModal(product)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedProduct(product); setShowModal(true); }} className="ms-2">Edit</Button>
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
      <ProductDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        product={selectedProduct}
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
