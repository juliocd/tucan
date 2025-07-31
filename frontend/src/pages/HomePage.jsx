import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [storeTypes, setStoreTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [storageTypes, setStorageTypes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [salesTransactions, setSalesTransactions] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await api.getProducts();
        setProducts(productsRes.data);

        const inventoryRes = await api.getInventory();
        setInventory(inventoryRes.data);

        const storeLocationsRes = await api.getStoreLocations();
        setStoreLocations(storeLocationsRes.data);

        const categoriesRes = await api.getCategories();
        setCategories(categoriesRes.data);

        const subcategoriesRes = await api.getSubcategories();
        setSubcategories(subcategoriesRes.data);

        const unitsRes = await api.getUnits();
        setUnits(unitsRes.data);

        const storeTypesRes = await api.getStoreTypes();
        setStoreTypes(storeTypesRes.data);

        const suppliersRes = await api.getSuppliers();
        setSuppliers(suppliersRes.data);

        const rolesRes = await api.getEmployeeRoles();
        setEmployeeRoles(rolesRes.data);

        const storageTypesRes = await api.getStorageTypes();
        setStorageTypes(storageTypesRes.data);

        const employeesRes = await api.getEmployees();
        setEmployees(employeesRes.data);

        const salesTransactionsRes = await api.getSalesTransactions();
        setSalesTransactions(salesTransactionsRes.data);

        const ordersRes = await api.getOrders();
        setOrders(ordersRes.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className='text-rusty'>Home</h2>
      <Row>
        <Col md={4}>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Products</Card.Title>
                <ul>
                  {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/categories" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Categories</Card.Title>
                <ul>
                  {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/subcategories" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Subcategories</Card.Title>
                <ul>
                  {subcategories.map(subcategory => (
                    <li key={subcategory.id}>{subcategory.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/units" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Units</Card.Title>
                <ul>
                  {units.map(unit => (
                    <li key={unit.id}>{unit.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/storetypes" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Store Types</Card.Title>
                <ul>
                  {storeTypes.map(storeType => (
                    <li key={storeType.id}>{storeType.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/suppliers" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Suppliers</Card.Title>
                <ul>
                  {suppliers.map(supplier => (
                    <li key={supplier.id}>{supplier.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/employeeroles" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Employee Roles</Card.Title>
                <ul>
                  {employeeRoles.map(employeeRole => (
                    <li key={employeeRole.id}>{employeeRole.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/employees" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Employees</Card.Title>
                <ul>
                  {employees.map(employee => (
                    <li key={employee.id}>{employee.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/storagetypes" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Storage Types</Card.Title>
                <ul>
                  {storageTypes.map(storageType => (
                    <li key={storageType.id}>{storageType.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/inventory" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Inventory</Card.Title>
                <ul>
                  {inventory.map(item => (
                    <li key={item.id}>{item.quantity_available}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/salestransactions" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Sales Transactions</Card.Title>
                <ul>
                  {salesTransactions.map(transaction => (
                    <li key={transaction.id}>{new Date(transaction.date_time).toLocaleDateString()} - {transaction.quantity_sold}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/orders" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Orders</Card.Title>
                <ul>
                  {orders.map(order => (
                    <li key={order.id}>{order.quantity_ordered} - {order.status}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/storelocations" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Store Locations</Card.Title>
                <ul>
                  {storeLocations.map(location => (
                    <li key={location.id}>{location.store_name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
