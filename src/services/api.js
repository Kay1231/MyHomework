import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:7001/api',
});

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const box = {
  getAll: () => api.get('/box'),
  getDetail: (id) => api.get(`/box/${id}`),
  draw: (boxId, userId) => api.post(`/box/${boxId}/draw`, { userId }),
};