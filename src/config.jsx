// let BaseURL ='http://localhost:8081'
// let BaseURL ='https://quickserv-backend.onrender.com/'

// Alternative: Direct localhost (will cause CORS unless backend has CORS enabled)
const BaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/';


export default BaseURL;