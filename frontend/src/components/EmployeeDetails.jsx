import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../api';

const EmployeeDetails = ({ show, handleClose, employee }) => {
  const [employeeRoleName, setEmployeeRoleName] = useState('');
  const [storeLocationName, setStoreLocationName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (employee) {
        try {
          const rolesRes = await api.getEmployeeRoles();
          const employeeRole = rolesRes.data.find(r => r.id === employee.role_id);
          if (employeeRole) setEmployeeRoleName(employeeRole.name);

          const storeLocationsRes = await api.getStoreLocations();
          const storeLocation = storeLocationsRes.data.find(sl => sl.id === employee.store_location_id);
          if (storeLocation) setStoreLocationName(storeLocation.store_name);

        } catch (error) {
          console.error('Failed to fetch related data for employee details', error);
        }
      }
    };

    if (show) {
      fetchData();
    }
  }, [employee, show]);

  if (!employee) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {employee.id}</p>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Role:</strong> {employeeRoleName}</p>
        <p><strong>Store Location:</strong> {storeLocationName}</p>
        <p><strong>Account ID:</strong> {employee.account_id}</p>
        <p><strong>Created At:</strong> {new Date(employee.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeDetails;
