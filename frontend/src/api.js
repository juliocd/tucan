import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default {
  getProducts(params) {
    return apiClient.get('/products/', { params });
  },
  createProduct(data) {
    return apiClient.post('/products/', data);
  },
  updateProduct(id, data) {
    return apiClient.put(`/products/${id}/`, data);
  },
  deleteProduct(id) {
    return apiClient.delete(`/products/${id}/`);
  },
  getCategories(params) {
    return apiClient.get('/categories/', { params });
  },
  createCategory(data) {
    return apiClient.post('/categories/', data);
  },
  updateCategory(id, data) {
    return apiClient.put(`/categories/${id}/`, data);
  },
  deleteCategory(id) {
    return apiClient.delete(`/categories/${id}/`);
  },
  getSubcategories(categoryId) {
    return apiClient.get('/subcategories/', { params: { category_id: categoryId } });
  },
  createSubcategory(data) {
    return apiClient.post('/subcategories/', data);
  },
  updateSubcategory(id, data) {
    return apiClient.put(`/subcategories/${id}/`, data);
  },
  deleteSubcategory(id) {
    return apiClient.delete(`/subcategories/${id}/`);
  },
  getStoreLocations() {
    return apiClient.get('/storelocations/');
  },
  createStoreLocation(data) {
    return apiClient.post('/storelocations/', data);
  },
  updateStoreLocation(id, data) {
    return apiClient.put(`/storelocations/${id}/`, data);
  },
  deleteStoreLocation(id) {
    return apiClient.delete(`/storelocations/${id}/`);
  },
  getUnits() {
    return apiClient.get('/units/');
  },
  createUnit(data) {
    return apiClient.post('/units/', data);
  },
  updateUnit(id, data) {
    return apiClient.put(`/units/${id}/`, data);
  },
  deleteUnit(id) {
    return apiClient.delete(`/units/${id}/`);
  },
  getStoreTypes() {
    return apiClient.get('/storetypes/');
  },
  createStoreType(data) {
    return apiClient.post('/storetypes/', data);
  },
  updateStoreType(id, data) {
    return apiClient.put(`/storetypes/${id}/`, data);
  },
  deleteStoreType(id) {
    return apiClient.delete(`/storetypes/${id}/`);
  },
  getSuppliers() {
    return apiClient.get('/suppliers/');
  },
  createSupplier(data) {
    return apiClient.post('/suppliers/', data);
  },
  updateSupplier(id, data) {
    return apiClient.put(`/suppliers/${id}/`, data);
  },
  deleteSupplier(id) {
    return apiClient.delete(`/suppliers/${id}/`);
  },
  getEmployeeRoles() {
    return apiClient.get('/employeeroles/');
  },
  createEmployeeRole(data) {
    return apiClient.post('/employeeroles/', data);
  },
  updateEmployeeRole(id, data) {
    return apiClient.put(`/employeeroles/${id}/`, data);
  },
  deleteEmployeeRole(id) {
    return apiClient.delete(`/employeeroles/${id}/`);
  },
  getStorageTypes() {
    return apiClient.get('/storagetypes/');
  },
  createStorageType(data) {
    return apiClient.post('/storagetypes/', data);
  },
  updateStorageType(id, data) {
    return apiClient.put(`/storagetypes/${id}/`, data);
  },
  deleteStorageType(id) {
    return apiClient.delete(`/storagetypes/${id}/`);
  },
  deleteInventory(id) {
    return apiClient.delete(`/inventory/${id}/`);
  },
  getEmployees() {
    return apiClient.get('/employees/');
  },
  createEmployee(data) {
    return apiClient.post('/employees/', data);
  },
  updateEmployee(id, data) {
    return apiClient.put(`/employees/${id}/`, data);
  },
  deleteEmployee(id) {
    return apiClient.delete(`/employees/${id}/`);
  },
  getSalesTransactions() {
    return apiClient.get('/salestransactions/');
  },
  createSalesTransaction(data) {
    return apiClient.post('/salestransactions/', data);
  },
  updateSalesTransaction(id, data) {
    return apiClient.put(`/salestransactions/${id}/`, data);
  },
  deleteSalesTransaction(id) {
    return apiClient.delete(`/salestransactions/${id}/`);
  },
  getOrders() {
    return apiClient.get('/orders/');
  },
  createOrder(data) {
    return apiClient.post('/orders/', data);
  },
  updateOrder(id, data) {
    return apiClient.put(`/orders/${id}/`, data);
  },
  deleteOrder(id) {
    return apiClient.delete(`/orders/${id}/`);
  },
  
  // Add other API calls here
  getInventory() {
    return apiClient.get('/inventory/');
  },
  createInventory(data) {
    return apiClient.post('/inventory/', data);
  },
  updateInventory(id, data) {
    return apiClient.put(`/inventory/${id}/`, data);
  },
  login(data) {
    return apiClient.post('/login/', data);
  },
  register(data) {
    return apiClient.post('/register/', data);
  },

};
