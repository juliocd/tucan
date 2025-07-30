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
  getProducts() {
    return apiClient.get('/products/');
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
  getCategories() {
    return apiClient.get('/categories/');
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
  getSubcategories() {
    return apiClient.get('/subcategories/');
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
  getStoreLocationTypes() {
    return apiClient.get('/storelocationtypes/');
  },
  createStoreLocationType(data) {
    return apiClient.post('/storelocationtypes/', data);
  },
  updateStoreLocationType(id, data) {
    return apiClient.put(`/storelocationtypes/${id}/`, data);
  },
  deleteStoreLocationType(id) {
    return apiClient.delete(`/storelocationtypes/${id}/`);
  },
  // Add other API calls here
  getInventory() {
    return apiClient.get('/inventory/');
  },
  getStoreLocations() {
    return apiClient.get('/storelocations/');
  },
  login(data) {
    return apiClient.post('/login/', data);
  },
  register(data) {
    return apiClient.post('/register/', data);
  },

};
