import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosRepuest = axios.create({
  baseURL: BASE_URL,
});

export default axiosRepuest;
