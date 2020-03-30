import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'http://localhost:8080/controlsocios/api/',
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'admin'
  },
  timeout: 20000,
});

export default AXIOS;