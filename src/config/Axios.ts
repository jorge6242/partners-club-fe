import axios from 'axios';

//http://club.api.com
//http://localhost:8000
//http://192.168.0.251/api/portalsocios/public
//http://190.216.224.53/api/portalsocios/public/

const AXIOS = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'admin'
    },
  timeout: 100000,
});

export default AXIOS;