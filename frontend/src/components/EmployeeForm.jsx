import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../api';

const EmployeeForm = ({ show, handleClose, employee, onSave }) => {
  const [formData, setFormData] = useState({});
  const [roles, setRoles] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);

  useEffect(() => {
    if (show) {
      if (employee) {
        setFormData({ ...employee });
      } else {
        setFormData({ name: '', role_id: '', store_location_id: '' });
      }
    }
  }, [employee, show]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesRes = await api.getRoles();
        setRoles(rolesRes.data);

        const storeLocationsRes = await api.getStoreLocations();
        setStoreLocations(storeLocationsRes.data);
      } catch (error) {
        console.error('Failed to fetch data for employee form', error);
      }
    };
    if (show) {
      fetchData();
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{employee ? 'Edit Employee' : 'Create Employee'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role_id"
              value={formData.role_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Store Location</Form.Label>
            <Form.Select
              name="store_location_id"
              value={formData.store_location_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Store Location</option>
              {storeLocations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.store_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeForm;
