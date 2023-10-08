import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-ordinis.onrender.com'
});

export default api;