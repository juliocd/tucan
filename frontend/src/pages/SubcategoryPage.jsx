import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal, Pagination, Form, Row, Col } from 'react-bootstrap';
import api from '../api';
import SubcategoryForm from '../components/SubcategoryForm';
import SubcategoryDetails from '../components/SubcategoryDetails';

const SubcategoryPage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    fetchSubcategories();
  }, [currentPage, pageSize, searchTerm, sortBy, sortDir]);

  const fetchSubcategories = async () => {
    try {
      const response = await api.getSubcategories({ 
        page: currentPage, 
        page_size: pageSize, 
        search: searchTerm,
        ordering: `${sortDir === 'desc' ? '-' : ''}${sortBy}`,
      });
      setSubcategories(response.data.results || []);
      setTotalPages(Math.ceil((response.data.count || 0) / pageSize));
    } catch (error) {
      setError('Failed to fetch subcategories.');
    }
  };

  const handleSave = async (subcategoryData) => {
    try {
      if (subcategoryData.id) {
        await api.updateSubcategory(subcategoryData.id, subcategoryData);
      } else {
        await api.createSubcategory(subcategoryData);
      }
      fetchSubcategories();
      setShowModal(false);
    } catch (error) {
      setError('Failed to save subcategory.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteSubcategory(id);
      fetchSubcategories();
      setShowConfirmModal(false);
    } catch (error) {
      setError('Failed to delete subcategory.');
    }
  };

  const openConfirmModal = (id) => {
    setSubcategoryToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedSubcategory(null);
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
      <h2 className='text-rusty'>Subcategories</h2>
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
            Create Subcategory
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {sortBy === 'name' && (sortDir === 'asc' ? '▲' : '▼')}</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map(subcategory => (
            <tr key={subcategory.id}>
              <td>{subcategory.name}</td>
              <td>{subcategory.category_name}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(subcategory)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedSubcategory(subcategory); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(subcategory.id)} className="ms-2">Delete</Button>
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
      <SubcategoryForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        subcategory={selectedSubcategory}
        onSave={handleSave}
      />
      <SubcategoryDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        subcategory={selectedSubcategory}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this subcategory?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(subcategoryToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SubcategoryPage;