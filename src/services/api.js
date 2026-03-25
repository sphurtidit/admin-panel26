import axios from 'axios';

const API_BASE_URL =
  (
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? '' : 'https://s26-backend.onrender.com')
  ).replace(
    /\/$/,
    ''
  );

// Create an Axios instance configured for your backend
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sends a login request to the admin login endpoint.
 * @param {object} credentials - The user's credentials.
 * @param {string} credentials.email - The admin's email.
 * @param {string} credentials.password - The admin's password.
 * @returns {Promise<object>} The data from the API response.
 */
export const loginAdmin = async (credentials) => {
  try {
    // This endpoint matches your backend adminRoutes.js
    const response = await apiClient.post('/login-admin', credentials);
    return response.data;
  } catch (error) {
    console.error('API Error: Failed to login', error.response || error.message);
    throw error.response ? error.response.data : new Error('Login failed. Please check the server connection.');
  }
};
