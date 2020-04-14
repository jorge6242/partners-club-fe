import axios from 'axios';

//http://club.api.com
//http://localhost:8000

const AXIOS = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'admin'
  },
  timeout: 100000,
});

export default AXIOS;