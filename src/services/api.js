import axios from 'axios';

// Configuración base de axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('🔑 Token en localStorage:', token ? 'Existe' : 'No existe');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token agregado al header');
    } else {
      console.log('❌ No hay token disponible');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  changePassword: (data) => api.put('/auth/change-password', data),
  createAdmin: (data) => api.post('/auth/create-admin', data),
};

// Servicios de retiros
export const retreatsAPI = {
  getAll: (params) => api.get('/retreats', { params }),
  getById: (id) => api.get(`/retreats/${id}`),
  getActive: () => api.get('/retreats/active/current'),
  getPast: () => api.get('/retreats/past'),
  getHeroData: () => api.get('/retreats/hero-data'),
  create: (data) => api.post('/retreats', data),
  update: (id, data) => api.put(`/retreats/${id}`, data),
  delete: (id) => api.delete(`/retreats/${id}`)
};

// Servicios de leads
export const leadsAPI = {
  getAll: (params) => api.get('/leads', { params }),
  getById: (id) => api.get(`/leads/${id}`),
  getStats: () => api.get('/leads/stats/overview'),
  create: (data) => api.post('/leads', data),
  update: (id, data) => api.put(`/leads/${id}`, data),
  delete: (id) => api.delete(`/leads/${id}`),
};

// Servicios de testimonios
export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  getById: (id) => api.get(`/testimonials/${id}`),
  getFeatured: () => api.get('/testimonials/featured/public'),
  validateToken: (token) => api.get(`/testimonials/validate/${token}`),
  submitWithToken: (token, data) => api.post(`/testimonials/submit/${token}`, data),
  createPublic: (data) => api.post('/testimonials/public', data), // Con token
  create: (data) => api.post('/testimonials', data), // Admin
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// Servicios de configuración
export const settingsAPI = {
  get: () => api.get('/settings'),
  getPublic: () => api.get('/settings/public'),
  update: (data) => api.put('/settings', data),
  reset: (data) => api.post('/settings/reset', data),
};

// Servicios de tokens
export const tokensAPI = {
  getAll: (params) => api.get('/tokens', { params }),
  getById: (id) => api.get(`/tokens/${id}`),
  generateForRetreat: (retreatId, data) => api.post(`/tokens/generate/${retreatId}`, data),
  delete: (id) => api.delete(`/tokens/${id}`),
  regenerate: (id) => api.post(`/tokens/${id}/regenerate`),
};

export default api;
