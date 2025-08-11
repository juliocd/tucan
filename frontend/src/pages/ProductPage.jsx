import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal, Form, Row, Col, Pagination } from 'react-bootstrap';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize, sortBy, sortDir, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts({ 
        page: currentPage, 
        page_size: pageSize, 
        ordering: `${sortDir === 'desc' ? '-' : ''}${sortBy}`,
        search: searchTerm
      });
      setProducts(response.data.results || []);
      setTotalPages(Math.ceil((response.data.count || 0) / pageSize));
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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  };

  return (
    <Container className="mt-2">
      <h2 className='text-rusty'>Products</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </Form.Select>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
            Create Product
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {sortBy === 'name' && (sortDir === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('price')}>Price {sortBy === 'price' && (sortDir === 'asc' ? '▲' : '▼')}</th>
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
      {totalPages > 0 && (
        <Pagination>
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages).keys()].map(page => (
            <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => setCurrentPage(page + 1)}>
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setCurrentPage(currentPage + 2)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      )}
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
