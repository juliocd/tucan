import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import api from '../api';
import VerticalNav from '../components/VerticalNav';
import '../styles/HomePage.css';
import ProductPage from './ProductPage';
import CategoryPage from './CategoryPage';
import SubcategoryPage from './SubcategoryPage';
import StoreTypePage from './StoreTypePage';
import UnitPage from './UnitPage';
import SupplierPage from './SupplierPage';
import EmployeeRolePage from './EmployeeRolePage';
import EmployeePage from './EmployeePage';
import StorageTypePage from './StorageTypePage';
import InventoryPage from './InventoryPage';
import SalesTransactionPage from './SalesTransactionPage';
import OrderPage from './OrderPage';
import StoreLocationPage from './StoreLocationPage';

const HomePage = () => {
  const [activeKey, setActiveKey] = useState('products');
  const [data, setData] = useState({
    products: [],
    inventory: [],
    storeLocations: [],
    categories: [],
    subcategories: [],
    units: [],
    storeTypes: [],
    suppliers: [],
    employeeRoles: [],
    storageTypes: [],
    employees: [],
    salesTransactions: [],
    orders: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          productsRes,
          inventoryRes,
          storeLocationsRes,
          categoriesRes,
          subcategoriesRes,
          unitsRes,
          storeTypesRes,
          suppliersRes,
          rolesRes,
          storageTypesRes,
          employeesRes,
          salesTransactionsRes,
          ordersRes,
        ] = await Promise.all([
          api.getProducts(),
          api.getInventory(),
          api.getStoreLocations(),
          api.getCategories(),
          api.getSubcategories(),
          api.getUnits(),
          api.getStoreTypes(),
          api.getSuppliers(),
          api.getEmployeeRoles(),
          api.getStorageTypes(),
          api.getEmployees(),
          api.getSalesTransactions(),
          api.getOrders(),
        ]);

        setData({
          products: productsRes.data,
          inventory: inventoryRes.data,
          storeLocations: storeLocationsRes.data,
          categories: categoriesRes.data,
          subcategories: subcategoriesRes.data,
          units: unitsRes.data,
          storeTypes: storeTypesRes.data,
          suppliers: suppliersRes.data,
          employeeRoles: rolesRes.data,
          storageTypes: storageTypesRes.data,
          employees: employeesRes.data,
          salesTransactions: salesTransactionsRes.data,
          orders: ordersRes.data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeKey) {
      case 'products':
        return (
          <ProductPage />
        );
      case 'categories':
        return (
          <CategoryPage />
        );
      case 'subcategories':
        return (
          <SubcategoryPage />
        );
      case 'units':
        return (
          <UnitPage />
        );
      case 'storeTypes':
        return (
          <StoreTypePage />
        );
      case 'suppliers':
        return (
          <SupplierPage />
        );
      case 'employeeRoles':
        return (
          <EmployeeRolePage />
        );
      case 'employees':
        return (
          <EmployeePage />
        );
      case 'storageTypes':
        return (
          <StorageTypePage />
        );
      case 'inventory':
        return (
          <InventoryPage />
        );
      case 'salesTransactions':
        return (
          <SalesTransactionPage />
        );
      case 'orders':
        return (
          <OrderPage />
        );
      case 'storeLocations':
        return (
          <StoreLocationPage />
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-page-container">
      <VerticalNav onSelect={setActiveKey} activeKey={activeKey} />
      <div className='w-100'>
        <Container fluid>
          <Row>
            <Col>
              {renderContent()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;