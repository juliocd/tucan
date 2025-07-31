import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import StoreLocationPage from './pages/StoreLocationPage';
import UnitPage from './pages/UnitPage';
import StoreTypePage from './pages/StoreTypePage';
import SupplierPage from './pages/SupplierPage';
import EmployeeRolePage from './pages/EmployeeRolePage';
import StorageTypePage from './pages/StorageTypePage';
import InventoryPage from './pages/InventoryPage';
import EmployeePage from './pages/EmployeePage';
import SalesTransactionPage from './pages/SalesTransactionPage';
import OrderPage from './pages/OrderPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Common.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="/products" element={<PrivateRoute />}>
          <Route path="/products" element={<ProductPage />} />
        </Route>
        <Route path="/categories" element={<PrivateRoute />}>
          <Route path="/categories" element={<CategoryPage />} />
        </Route>
        <Route path="/subcategories" element={<PrivateRoute />}>
          <Route path="/subcategories" element={<SubcategoryPage />} />
        </Route>
        <Route path="/storelocations" element={<PrivateRoute />}>
          <Route path="/storelocations" element={<StoreLocationPage />} />
        </Route>
        <Route path="/units" element={<PrivateRoute />}>
          <Route path="/units" element={<UnitPage />} />
        </Route>
        <Route path="/storetypes" element={<PrivateRoute />}>
          <Route path="/storetypes" element={<StoreTypePage />} />
        </Route>
        <Route path="/suppliers" element={<PrivateRoute />}>
          <Route path="/suppliers" element={<SupplierPage />} />
        </Route>
        <Route path="/employeeroles" element={<PrivateRoute />}>
          <Route path="/employeeroles" element={<EmployeeRolePage />} />
        </Route>
        <Route path="/storagetypes" element={<PrivateRoute />}>
          <Route path="/storagetypes" element={<StorageTypePage />} />
        </Route>
        <Route path="/inventory" element={<PrivateRoute />}>
          <Route path="/inventory" element={<InventoryPage />} />
        </Route>
        <Route path="/employees" element={<PrivateRoute />}>
          <Route path="/employees" element={<EmployeePage />} />
        </Route>
        <Route path="/salestransactions" element={<PrivateRoute />}>
          <Route path="/salestransactions" element={<SalesTransactionPage />} />
        </Route>
        <Route path="/orders" element={<PrivateRoute />}>
          <Route path="/orders" element={<OrderPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
