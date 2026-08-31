import axios from 'axios';

const api = axios.create({
  baseURL: 'https://verbose-chainsaw-g45wpv9g6q973vg99-3000.app.github.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para ajudar no debug (mostra no console se der erro)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;