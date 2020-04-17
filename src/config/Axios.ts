import axios from 'axios';

//http://club.api.com
//http://localhost:8000
//http://192.168.0.251/api/portalsocios/public
//http://190.216.224.53/api/portalsocios/public/

//http://192.168.0.252:9002/

const AXIOS = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Partners-Application': 'admin'
    },
  timeout: 100000,
});

export default AXIOS;