import axios from 'axios';

// Create an Axios instance configured for your backend
const apiClient = axios.create({
  // IMPORTANT: This URL assumes your backend is running on localhost port 4000.
  // We will make this more flexible later.
  baseURL: 'http://localhost:4000/api/admin', 
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
