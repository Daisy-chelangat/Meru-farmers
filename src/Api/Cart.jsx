import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get customer's cart
export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch cart' };
  }
};

// Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post('/cart/add', { productId, quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add item to cart' };
  }
};

// Update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.put(`/cart/update/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update cart item' };
  }
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/remove/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to remove item from cart' };
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const response = await api.delete('/cart/clear');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to clear cart' };
  }
};