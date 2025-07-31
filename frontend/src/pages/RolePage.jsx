import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import RoleForm from '../components/RoleForm';
import RoleDetails from '../components/RoleDetails';

const RolePage = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await api.getRoles();
      setRoles(response.data);
    } catch (err) {
      setError('Failed to fetch roles.');
    }
  };

  const handleSave = async (roleData) => {
    try {
      if (roleData.id) {
        await api.updateRole(roleData.id, roleData);
      } else {
        await api.createRole(roleData);
      }
      fetchRoles();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save role.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteRole(id);
      fetchRoles();
      setShowConfirmModal(false);
    } catch (err) {
      setError('Failed to delete role.');
    }
  };

  const openConfirmModal = (id) => {
    setRoleToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (role) => {
    setSelectedRole(role);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedRole(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-5">
      <h2>Roles</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={openCreateModal}>
        Create Role
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(role)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedRole(role); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(role.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <RoleForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        role={selectedRole}
        onSave={handleSave}
      />
      <RoleDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        role={selectedRole}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this role?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(roleToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RolePage;
