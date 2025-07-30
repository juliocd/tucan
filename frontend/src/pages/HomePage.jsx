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
  const [storageTypes, setStorageTypes] = useState([]);
  const [storeLocationTypes, setStoreLocationTypes] = useState([]);

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

        const storageTypesRes = await api.getStorageTypes();
        setStorageTypes(storageTypesRes.data);

        const storeLocationTypesRes = await api.getStoreLocationTypes();
        setStoreLocationTypes(storeLocationTypesRes.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Home</h2>
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
          <Link to="/storelocationtypes" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Title>Store Location Types</Card.Title>
                <ul>
                  {storeLocationTypes.map(storeLocationType => (
                    <li key={storeLocationType.id}>{storeLocationType.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Inventory</Card.Title>
              <ul>
                {inventory.map(item => (
                  <li key={item.id}>{item.quantity}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
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