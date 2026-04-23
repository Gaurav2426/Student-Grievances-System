import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerStudent = (data) => API.post('/register', data);
export const loginStudent = (data) => API.post('/login', data);

// Grievance APIs
export const submitGrievance = (data) => API.post('/grievances', data);
export const getAllGrievances = () => API.get('/grievances');
export const getGrievanceById = (id) => API.get(`/grievances/${id}`);
export const updateGrievance = (id, data) => API.put(`/grievances/${id}`, data);
export const deleteGrievance = (id) => API.delete(`/grievances/${id}`);
export const searchGrievances = (params) => API.get('/grievances/search', { params });

export default API;
