import React from 'react';
import { Nav } from 'react-bootstrap';
import '../styles/VerticalNav.css';

const VerticalNav = ({ onSelect, activeKey }) => {
  const navItems = [
    { key: 'products', label: 'Products' },
    { key: 'categories', label: 'Categories' },
    { key: 'subcategories', label: 'Subcategories' },
    { key: 'units', label: 'Units' },
    { key: 'storeTypes', label: 'Store Types' },
    { key: 'suppliers', label: 'Suppliers' },
    { key: 'employeeRoles', label: 'Employee Roles' },
    { key: 'employees', label: 'Employees' },
    { key: 'storageTypes', label: 'Storage Types' },
    { key: 'inventory', label: 'Inventory' },
    { key: 'salesTransactions', label: 'Sales Transactions' },
    { key: 'orders', label: 'Orders' },
    { key: 'storeLocations', label: 'Store Locations' },
  ];

  return (
    <Nav className="flex-column vertical-nav" activeKey={activeKey} onSelect={onSelect}>
      {navItems.map(item => (
        <Nav.Item key={item.key} className="nav-item nav-item-custom">
          <Nav.Link eventKey={item.key} className="nav-link">
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default VerticalNav;
