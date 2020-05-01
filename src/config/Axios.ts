import axios from 'axios';

//http://club.api.com
//http://localhost:8000
//http://192.168.0.251/api/portalsocios/public
//http://190.216.224.53/api/portalsocios/public/

//http://192.168.0.252:9002/

//http://190.216.224.53:8082

//http://192.168.0.252:9002

console.log('process.env.REACT_ENDPOINT_URL ', process.env.REACT_APP_ENDPOINT_URL);

const baseURL = process.env.REACT_APP_ENDPOINT_URL;

const AXIOS = axios.create({
  baseURL: 'http://192.168.0.252:9002',
  headers: {
    'Partners-Application': 'admin'
    },
  timeout: 100000,
});

export default AXIOS;