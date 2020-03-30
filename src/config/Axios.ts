import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'http://localhost:8080/controlsocios/qa/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
});

export default AXIOS;