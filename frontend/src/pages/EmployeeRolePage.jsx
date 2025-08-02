import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import EmployeeRoleForm from '../components/EmployeeRoleForm';
import EmployeeRoleDetails from '../components/EmployeeRoleDetails';

const EmployeeRolePage = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchEmployeeRoles();
  }, []);

  const fetchEmployeeRoles = async () => {
    try {
      const response = await api.getEmployeeRoles();
      setRoles(response.data);
    } catch (error) {
      setError('Failed to fetch roles.');
    }
  };

  const handleSave = async (roleData) => {
    try {
      if (roleData.id) {
        await api.updateEmployeeRole(roleData.id, roleData);
      } else {
        await api.createEmployeeRole(roleData);
      }
      fetchEmployeeRoles();
      setShowModal(false);
    } catch (error) {
      setError('Failed to save role.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteEmployeeRole(id);
      fetchEmployeeRoles();
      setShowConfirmModal(false);
    } catch (error) {
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
    <Container className="mt-2">
      <h2 className='text-rusty'>Employee Roles</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="d-flex justify-content-end w-100">
        <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
          Create Employee Role
        </Button>
      </div>
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
      <EmployeeRoleForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        role={selectedRole}s
        onSave={handleSave}
      />
      <EmployeeRoleDetails
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

export default EmployeeRolePage;
