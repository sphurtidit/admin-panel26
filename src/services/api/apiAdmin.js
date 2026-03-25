import axios from 'axios';
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? '' : 'https://s26-backend.onrender.com')
).replace(/\/$/, '');

const getAllAdmins = async ({ headers }) => {
  const res = await axios.get(`${API_BASE_URL}/api/admins`, {
    headers: headers,
  });

  const { data } = res.data;

  return data;
};

const createAdmin = async ({ username, password, role, headers }) => {
  const res = await axios.post(
    `${API_BASE_URL}/api/admin`,
    {
      username,
      password,
      role,
    },
    {
      headers: headers,
    }
  );

  const { data } = res.data;
  return data;
};

const login = async ({ username, password }) => {
  const res = await axios.post(`${API_BASE_URL}/api/login-admin`, {
    username,
    password,
  });

  const { data, token } = res.data;
  return { data, token };
};

const verify = async ({ headers }) => {
  const res = await axios.get(`${API_BASE_URL}/api/verify-admin`, {
    headers: headers,
  });

  return res.data.data;
};

const createEvent = async ({ headers, formData }) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/events`, formData, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const fetchAllEvents = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/events`);
    return res.data;
  } catch (err) {
    return err;
  }
};

const fetchEventById = async ({ id }) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/events/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

const createCategory = async ({ headers, eventCategoryData }) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/eventCategory`,
      eventCategoryData,
      {
        headers: headers,
      }
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

const deleteEvent = async ({ id, headers }) => {
  console.log(`${API_BASE_URL}/api/events/${id}`);
  try {
    const res = await axios.delete(`${API_BASE_URL}/api/events/${id}`, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const deleteCategory = async ({ id, headers }) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/api/eventCategory/${id}`, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const createSchedule = async ({ data, headers }) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/matches`, data, {
      headers: headers,
    });

    return res.data;
  } catch (err) {
    return err;
  }
};

const getSchedule = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/matches/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

const updateSchedule = async ({ id, headers, data }) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/api/matches/${id}`, data, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const deleteSchedule = async ({ id, headers }) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/api/matches/${id}`, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const getAllRegistrations = async ({ headers }) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/registration`, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const updateCategory = async ({ headers, data }) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/api/eventCategory`, data, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const getAllPayments = async ({ headers }) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/payments`, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const getRegistrationsByCategory = async ({ id, headers }) => {
  console.log('Fetching data for category ID:', id);

  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/registration/category/${id}`,
      { headers }
    );
    console.log('Response:', res);
    return res.data;
  } catch (err) {
    console.error('Error fetching registration data:', err);
    return null;
  }
};

const deleteRegistration = async ({ headers, id }) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/registration/admin/${id}`,
      {
        headers: headers,
      }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export {
  getAllAdmins,
  createAdmin,
  login,
  verify,
  createEvent,
  fetchAllEvents,
  fetchEventById,
  createCategory,
  deleteEvent,
  deleteCategory,
  createSchedule,
  getSchedule,
  deleteSchedule,
  getAllRegistrations,
  getAllPayments,
  getRegistrationsByCategory,
  updateCategory,
  deleteRegistration,
  updateSchedule,
};
