import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../api';

const ProductDetails = ({ show, handleClose, product }) => {
  const [categoryName, setCategoryName] = React.useState('');
  const [subcategoryName, setSubcategoryName] = React.useState('');
  const [unitName, setUnitName] = React.useState('');
  const [supplierName, setSupplierName] = React.useState('');
  const [storageTypeName, setStorageTypeName] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      if (product) {
        try {
          const categoriesRes = await api.getCategories();
          const category = categoriesRes.data.find(cat => cat.id === product.category_id);
          if (category) setCategoryName(category.name);

          const subcategoriesRes = await api.getSubcategories();
          const subcategory = subcategoriesRes.data.find(sub => sub.id === product.subcategory_id);
          if (subcategory) setSubcategoryName(subcategory.name);

          const unitsRes = await api.getUnits();
          const unit = unitsRes.data.find(u => u.id === product.unit_id);
          if (unit) setUnitName(unit.name);

          const suppliersRes = await api.getSuppliers();
          const supplier = suppliersRes.data.find(sup => sup.id === product.supplier_id);
          if (supplier) setSupplierName(supplier.name);

          const storageTypesRes = await api.getStorageTypes();
          const storageType = storageTypesRes.data.find(st => st.id === product.storage_type_id);
          if (storageType) setStorageTypeName(storageType.name);

        } catch (error) {
          console.error('Failed to fetch related data', error);
        }
      }
    };

    if (show) {
      fetchData();
    }
  }, [product, show]);

  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Category:</strong> {categoryName}</p>
        <p><strong>Subcategory:</strong> {subcategoryName}</p>
        <p><strong>Unit:</strong> {unitName}</p>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Supplier:</strong> {supplierName}</p>
        <p><strong>Shelf Life:</strong> {product.shelf_life} days</p>
        <p><strong>Reorder Threshold:</strong> {product.reorder_threshold}</p>
        <p><strong>Storage Type:</strong> {storageTypeName}</p>
        <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetails;
