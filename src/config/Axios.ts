import axios from 'axios';

//http://club.api.com

const AXIOS = axios.create({
  baseURL: 'http://club.api.com',
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'admin'
  },
  timeout: 100000,
});

export default AXIOS;