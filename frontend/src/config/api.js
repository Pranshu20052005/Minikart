// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://minikart-backend-rbvj.onrender.com/api'
  : 'http://localhost:3000/api';

export default API_BASE_URL;
