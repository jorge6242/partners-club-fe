import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'http://localhost:85',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

export default AXIOS;