const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data.message || 'An error occurred',
      data: data.data || null,
    };
  }

  return data;
};

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
};

export const authAPI = {
  userSignup: (name, email, password) =>
    fetchWithAuth('/auth/user/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  userLogin: (email, password) =>
    fetchWithAuth('/auth/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  providerSignup: (name, email, password, role, wage, phone) =>
    fetchWithAuth('/auth/provider/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role, wage, phone }),
    }),

  providerLogin: (email, password) =>
    fetchWithAuth('/auth/provider/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

export const userAPI = {
  getProfile: () => fetchWithAuth('/users/me', { method: 'GET' }),

  updateProfile: (data) =>
    fetchWithAuth(`/users/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteAccount: (userId) =>
    fetchWithAuth(`/users/${userId}`, { method: 'DELETE' }),

  requestService: (userId, serviceType, location) =>
    fetchWithAuth(`/users/${userId}/request`, {
      method: 'POST',
      body: JSON.stringify({ serviceType, location }),
    }),
};

export const providerAPI = {
  getAll: (page = 1, limit = 20, filters = {}) => {
    const params = new URLSearchParams({
      page,
      limit,
      ...filters,
    });
    return fetchWithAuth(`/providers?${params.toString()}`, { method: 'GET' });
  },

  getById: (id) => fetchWithAuth(`/providers/${id}`, { method: 'GET' }),

  getByRole: (role, page = 1, limit = 20) =>
    fetchWithAuth(`/providers/role/${role}?page=${page}&limit=${limit}`, {
      method: 'GET',
    }),

  getProfile: () => fetchWithAuth('/providers/me', { method: 'GET' }),

  updateProfile: (id, data) =>
    fetchWithAuth(`/providers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  updateAvailability: (id, availability) =>
    fetchWithAuth(`/providers/${id}/availability`, {
      method: 'PATCH',
      body: JSON.stringify({ availability }),
    }),

  deleteProfile: (id) =>
    fetchWithAuth(`/providers/${id}`, { method: 'DELETE' }),
};

export default {
  authAPI,
  userAPI,
  providerAPI,
};
