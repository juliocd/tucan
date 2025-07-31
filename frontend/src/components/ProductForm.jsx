import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../api';

const ProductForm = ({ show, handleClose, product, onSave }) => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [storageTypes, setStorageTypes] = useState([]);

  useEffect(() => {
    if (show) {
      if (product) {
        setFormData({ ...product });
      } else {
        setFormData({ 
          name: '',
          category_id: '',
          subcategory_id: '',
          unit_id: '',
          price: '',
          supplier_id: '',
          shelf_life: '',
          reorder_threshold: '',
          storage_type_id: '',
        });
      }
    }
  }, [product, show]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    const fetchSubcategories = async () => {
      try {
        const response = await api.getSubcategories();
        setSubcategories(response.data);
      } catch (error) {
        console.error('Failed to fetch subcategories', error);
      }
    };
    const fetchUnits = async () => {
      try {
        const response = await api.getUnits();
        setUnits(response.data);
      } catch (error) {
        console.error('Failed to fetch units', error);
      }
    };
    const fetchSuppliers = async () => {
      try {
        const response = await api.getSuppliers();
        setSuppliers(response.data);
      } catch (error) {
        console.error('Failed to fetch suppliers', error);
      }
    };
    const fetchStorageTypes = async () => {
      try {
        const response = await api.getStorageTypes();
        setStorageTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch storage types', error);
      }
    };
    if (show) {
      fetchCategories();
      fetchSubcategories();
      fetchUnits();
      fetchSuppliers();
      fetchStorageTypes();
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, category_id: categoryId, subcategory_id: '' });
    if (categoryId) {
      try {
        const response = await api.getSubcategories(categoryId);
        setSubcategories(response.data);
      } catch (error) {
        console.error('Failed to fetch subcategories by category', error);
      }
    } else {
      setSubcategories([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Edit Product' : 'Create Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category_id"
              value={formData.category_id || ''}
              onChange={handleCategoryChange}
            >
              <option value="">Select a Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subcategory</Form.Label>
            <Form.Select
              name="subcategory_id"
              value={formData.subcategory_id || ''}
              onChange={handleChange}
              disabled={!formData.category_id}
            >
              <option value="">Select a Subcategory</option>
              {subcategories.map(subcategory => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Select
              name="unit_id"
              value={formData.unit_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Unit</option>
              {units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Supplier</Form.Label>
            <Form.Select
              name="supplier_id"
              value={formData.supplier_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Storage Type</Form.Label>
            <Form.Select
              name="storage_type_id"
              value={formData.storage_type_id || ''}
              onChange={handleChange}
            >
              <option value="">Select a Storage Type</option>
              {storageTypes.map(storageType => (
                <option key={storageType.id} value={storageType.id}>
                  {storageType.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={formData.price || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Shelf Life (days)</Form.Label>
            <Form.Control type="number" name="shelf_life" value={formData.shelf_life || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Reorder Threshold</Form.Label>
            <Form.Control type="number" name="reorder_threshold" value={formData.reorder_threshold || ''} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;