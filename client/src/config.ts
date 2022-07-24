import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const axiosRepuest = axios.create({
  baseURL: BASE_URL,
});

export default axiosRepuest;
