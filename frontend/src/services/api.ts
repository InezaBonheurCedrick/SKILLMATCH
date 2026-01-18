/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

console.log("MY API URL IS:", import.meta.env.VITE_API_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentOpportunities: (limit: number = 5) => 
    api.get(`/dashboard/recent-opportunities?limit=${limit}`),
};

export const opportunitiesAPI = {
  getAll: (params?: any) => api.get('/opportunities', { params }),
  getById: (id: string) => api.get(`/opportunities/${id}`),
  create: (data: any) => api.post('/opportunities', data),
  update: (id: string, data: any) => api.patch(`/opportunities/${id}`, data),
  delete: (id: string) => api.delete(`/opportunities/${id}`),
};

export const applicationsAPI = {
  getAll: (params?: any) => api.get('/applications', { params }),
  getById: (id: string) => api.get(`/applications/${id}`),
  create: (data: any) => api.post('/applications/submit', data),
  updateStatus: (id: string, status: string, adminNotes?: string) => 
    api.patch(`/applications/${id}/status`, { status, adminNotes }),
  update: (id: string, data: any) => api.patch(`/applications/${id}`, data),
  delete: (id: string) => api.delete(`/applications/${id}`),
};

export const authAPI = {
  signin: (email: string, password: string) => 
    api.post('/auth/signin', { email, password }),
  signup: (data: any) => api.post('/auth/signup', data),
  changePassword: (oldPassword: string, newPassword: string) =>
    api.patch('/auth/change-password', { oldPassword, newPassword }),
};

export default api;
