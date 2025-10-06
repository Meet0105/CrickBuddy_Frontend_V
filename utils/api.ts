import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app'
});

export default api;
