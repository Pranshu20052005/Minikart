// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://minikart-1.onrender.com/api'  // Updated to match the deployed frontend domain
  : 'http://localhost:3000/api';

export default API_BASE_URL;
