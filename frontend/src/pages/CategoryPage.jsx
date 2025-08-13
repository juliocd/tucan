import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal, Pagination, Form, Row, Col } from 'react-bootstrap';
import api from '../api';
import CategoryForm from '../components/CategoryForm';
import CategoryDetails from '../components/CategoryDetails';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    fetchCategories();
  }, [currentPage, pageSize, searchTerm, sortBy, sortDir]);

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories({ 
        page: currentPage, 
        page_size: pageSize, 
        search: searchTerm,
        ordering: `${sortDir === 'desc' ? '-' : ''}${sortBy}`,
      });
      setCategories(response.data || []);
      setTotalPages(1); // Since pagination is disabled, there's only one page
    } catch (_error) {
      setError('Failed to fetch categories.');
    }
  };

  const handleSave = async (categoryData) => {
    try {
      if (categoryData.id) {
        await api.updateCategory(categoryData.id, categoryData);
      } else {
        await api.createCategory(categoryData);
      }
      fetchCategories();
      setShowModal(false);
    } catch (error) {
      setError('Failed to save category.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteCategory(id);
      fetchCategories();
      setShowConfirmModal(false);
    } catch (error) {
      setError('Failed to delete category.');
    }
  };

  const openConfirmModal = (id) => {
    setCategoryToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (category) => {
    setSelectedCategory(category);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedCategory(null);
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
      <h2 className='text-rusty'>Categories</h2>
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
        <Col className="d-flex justify-content-end">
          <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
            Create Category
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {sortBy === 'name' && (sortDir === 'asc' ? '▲' : '▼')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(category)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedCategory(category); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(category.id)} className="ms-2">Delete</Button>
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
          <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      )}
      <CategoryForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        category={selectedCategory}
        onSave={handleSave}
      />
      <CategoryDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        category={selectedCategory}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(categoryToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CategoryPage;