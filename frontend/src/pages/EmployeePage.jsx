import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import api from '../api';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeDetails from '../components/EmployeeDetails';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
    fetchStoreLocations();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      setError('Failed to fetch employees.');
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.getEmployeeRoles();
      setEmployeeRoles(response.data);
    } catch (error) {
      console.error('Failed to fetch employee roles', error);
    }
  };

  const fetchStoreLocations = async () => {
    try {
      const response = await api.getStoreLocations();
      setStoreLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch store locations', error);
    }
  };

  const getRoleName = (roleId) => {
    const employeeRole = employeeRoles.find(r => r.id === roleId);
    return employeeRole ? employeeRole.name : 'Unknown';
  };

  const getStoreLocationName = (locationId) => {
    const location = storeLocations.find(l => l.id === locationId);
    return location ? location.store_name : 'Unknown';
  };

  const handleSave = async (employeeData) => {
    try {
      if (employeeData.id) {
        await api.updateEmployee(employeeData.id, employeeData);
      } else {
        await api.createEmployee(employeeData);
      }
      fetchEmployees();
      setShowModal(false);
    } catch (error) {
      setError('Failed to save employee.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteEmployee(id);
      fetchEmployees();
      setShowConfirmModal(false);
    } catch (error) {
      setError('Failed to delete employee.');
    }
  };

  const openConfirmModal = (id) => {
    setEmployeeToDelete(id);
    setShowConfirmModal(true);
  };

  const openDetailsModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const openCreateModal = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  }

  return (
    <Container className="mt-2">
      <h2 className='text-rusty'>Employees</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="d-flex justify-content-end w-100">
        <Button className='btn-primary-gr' variant="primary" onClick={openCreateModal}>
          Create Employee
        </Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Store Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{getRoleName(employee.role_id)}</td>
              <td>{getStoreLocationName(employee.store_location_id)}</td>
              <td>
                <Button variant="secondary" onClick={() => openDetailsModal(employee)}>View</Button>
                <Button variant="info" onClick={() => { setSelectedEmployee(employee); setShowModal(true); }} className="ms-2">Edit</Button>
                <Button variant="danger" onClick={() => openConfirmModal(employee.id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EmployeeForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        employee={selectedEmployee}
        onSave={handleSave}
      />
      <EmployeeDetails
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        employee={selectedEmployee}
      />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(employeeToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeePage;
