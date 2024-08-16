import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers if it exists in the cookies
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register a new user
export const registerUser = async (data) => {
  try {
    const response = await api.post('api/register/user', data);
    // Set token in a cookie
    Cookies.set('access_token', response.data.data.access_token, { expires: 7 }); // Expires in 7 days
    Cookies.set('user_id', response.data.data.user_id);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login a user
export const loginUser = async (data) => {
  try {
    const response = await api.post('api/login/user', data);
    // Set token in a cookie
    Cookies.set('access_token', response.data.access_token, { expires: 7 });
    Cookies.set('user_id', response.data.data.user_id);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Logout a user
export const logoutUser = async () => {
  try {
    // Optionally, make a request to the backend to invalidate the token
    await api.post('api/logout/user');

    // Clear the cookies
    Cookies.remove('access_token');
    Cookies.remove('user_id');
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

// CRUD Operations (unchanged)
export const createResource = async (data) => {
  try {
    const response = await api.post('api/task', data);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

export const getResources = async () => {
  try {
    const response = await api.get('api/task');
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

export const getResourceById = async (id) => {
  try {
    const response = await api.get(`/resource/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resource:', error);
    throw error;
  }
};

export const updateResource = async (id, data) => {
  try {
    const response = await api.put(`api/task/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
};

export const deleteResource = async (id) => {
  try {
    const response = await api.delete(`api/task/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
};

export default api;
