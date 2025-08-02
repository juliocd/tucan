import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../api';

const StoreLocationForm = ({ show, handleClose, storeLocation, onSave }) => {
  const [formData, setFormData] = useState({});
  const [storeTypes, setStoreTypes] = useState([]);

  useEffect(() => {
    if (show) {
      if (storeLocation) {
        setFormData({ ...storeLocation });
      } else {
        setFormData({ store_name: '', store_type_id: '', address: '', contact_info: '' });
      }
    }
  }, [storeLocation, show]);

  useEffect(() => {
    const fetchStoreTypes = async () => {
      try {
        const response = await api.getStoreTypes();
        setStoreTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch store types', error);
      }
    };
    if (show) {
      fetchStoreTypes();
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
        <Modal.Title>{storeLocation ? 'Edit Store Location' : 'Create Store Location'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control type="text" name="store_name" value={formData.store_name || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Store Type</Form.Label>
            <Form.Select
              name="store_type_id"
              value={formData.store_type_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Store Type</option>
              {storeTypes.map(storeType => (
                <option key={storeType.id} value={storeType.id}>
                  {storeType.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={formData.address || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Info</Form.Label>
            <Form.Control type="text" name="contact_info" value={formData.contact_info || ''} onChange={handleChange} />
          </Form.Group>
          <Button className='btn-primary-gr' variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StoreLocationForm;
