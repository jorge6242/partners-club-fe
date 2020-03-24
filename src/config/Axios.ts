import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'http://club.api.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

export default AXIOS;