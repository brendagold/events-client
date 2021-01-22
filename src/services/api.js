import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://event-backend-brenda.herokuapp.com',
});

export default api;
